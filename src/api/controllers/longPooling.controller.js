const { success, error, info } = require('consola');
const { connection } = require('mongoose');

let connections = [];
const LIMIT = 200;
const DELAY = 1000;
exports.longPooling = async (req, res, next) => {
  try {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    connections.push(res);
    // return res.status(200).json({
    //   success: true,
    // });
  } catch (error) {
    return next(error);
  }
};

let tick = 0;

setTimeout(function run() {
  console.log('tick', tick);
  if (++tick > LIMIT) {
    connections.map((res) => {
      res.write('END\n');
      res.end();
    });
    connections = [];
    tick = 0;
  }
  connections.map((res) => {
    res.write(`Hello response -> ${tick}\n`);
  });
  setTimeout(run, DELAY);
}, DELAY);
