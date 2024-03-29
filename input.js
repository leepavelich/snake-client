const { MOVEMENTS, MESSAGES } = require('./constants')

// Stores the active TCP connection object.
let connection;

// setup interface to handle user input from stdin

const setupInput = conn => {
  connection = conn;

  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  stdin.on("data", handleUserInput);

  return stdin;
};

const handleUserInput = key => {
  if (key in MOVEMENTS) connection.write(`Move: ${MOVEMENTS[key]}`);

  if (key in MESSAGES) connection.write(`Say: ${MESSAGES[key]}`);
  
  // \u0003 maps to ctrl+c input
  if (key === '\u0003') {
    process.exit();
  }
};

module.exports = { setupInput };