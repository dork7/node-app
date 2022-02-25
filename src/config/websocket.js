const io = require("socket.io")(7878, {
  cors: {
    origin: "*",
  },
});
let clientIds = [];
io.on("connection", (socket) => {
  console.log("socket.id", socket.id);
  clientIds.push(socket.id);
  socket.on("custom-event", (number, string, object) => {
    console.log("number, string, object", number, string, object);
  });

  socket.on("send-message", (number, string, object) => {
    // console.log("number, string, object", number, string, object);
    // io.emit("received-message", "msg from server"); // will send message to all the users
    // socket.broadcast.emit("received-message", "msg from server"); // will send message to all the users, except the one who sent it
    // console.log("Message to clientId -> ", clientIds[0]);
    // socket.to(clientIds[1]).emit("received-message", "msg from server"); // not working idk, idc
  });

  socket.on("room-message", (message, room) => {
    // console.log("number, string, object", number, string, object);
    // io.emit("received-message", "msg from server"); // will send message to all the users
    // socket.broadcast.emit("received-message", "msg from server"); // will send message to all the users, except the one who sent it
    // console.log("Message to clientId -> ", clientIds[0]);
    console.log("room, message", room, message);
    socket.to(room).emit("received-message", message); // not working idk, idc
  });

  socket.on("join-room", (roomId) => {
    console.log("joinRoom", roomId);
    socket.join(roomId);
  });
});

module.exports = io;
