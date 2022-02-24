const SSE_RESPONSE_HEADER = {
  Connection: "keep-alive",
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "X-Accel-Buffering": "no",
};

global.usersStreams = {};
exports.pushEvent = async (req, res, next) => {
  try {
    const message = req.body;
    sendStream(getUserId(req), message);
    res.json(message);
  } catch (error) {
    return next(error);
  }
};

const sendStream = async (userId, data) => {
  if (!userId) return;
  if (!global.usersStreams[userId]) return;
  if (!data) return;
  const { res } = global.usersStreams[userId];
  //   res.write("id: 12345\n");
  res.write(`event: message\n`);
  //   res.write(`event: ${eventType}\n`); // add event listeners on the basis of event types
  res.write(`data: ${JSON.stringify(data)}\n\n`);
  global.usersStreams[userId].lastInteraction = Date.now();
};

exports.getClientEvent = async (req, res, next) => {
  try {
    setupStream(req, res, next);
  } catch (error) {
    return next(error);
  }
};

const setupStream = (req, res, next) => {
  let userId = getUserId(req);
  if (!userId) {
    next({ message: "stream.no-user" });
    return;
  }
  // Store this connection
  global.usersStreams[userId] = {
    res,
    lastInteraction: null,
  };
  // Writes response header
  res.writeHead(200, SSE_RESPONSE_HEADER);
  // Note: Heatbeat for avoidance of client's request timeout of first time (30 sec, can be fine tuned)
  res.write(`data: ${JSON.stringify({ type: "heartbeat" })}\n\n`);
  global.usersStreams[userId].lastInteraction = Date.now();
  // Interval loop
  const maxInterval = 55000;
  const interval = 3000;
  let intervalId = setInterval(function () {
    if (!global.usersStreams[userId]) return;
    if (Date.now() - global.usersStreams[userId].lastInteraction < maxInterval)
      return;
    res.write(`data: ${JSON.stringify({ type: "heartbeat" })}\n\n`);
    global.usersStreams[userId].lastInteraction = Date.now();
  }, interval);
  function cleanConnection() {
    let userId = getUserId(req);
    clearInterval(intervalId);
    delete global.usersStreams[userId];
  }
  req.on("close", cleanConnection);
  req.on("end", cleanConnection);
};

exports.getAllClients = async (req, res, next) => {
  try {
    const clientList = Object.keys(global.usersStreams).map((clientId) => {
      return {
        clientId,
        lastInteraction: new Date(
          global.usersStreams[clientId].lastInteraction
        ).toString(),
      };
    });
    console.log("clientList", clientList);
    console.log(
      "Object.keys(global.usersStreams)",
      Object.keys(global.usersStreams)
    );
    return res.status(200).json({
      success: true,
      clientList,
    });
  } catch (error) {
    return next(error);
  }
};

function getUserId(req) {
  return req.params.clientId;
}
