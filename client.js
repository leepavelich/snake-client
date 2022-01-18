const net = require("net");
const { IP, PORT, PLAYER_NAME } = require('./constants')

// establishes a connection with the game server
const connect = function() {
  const conn = net.createConnection({
    host: IP,
    port: PORT
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  conn.on("connect", () => {
    console.log('Successfully connected to game server');
    conn.write(`Name: ${PLAYER_NAME}`);

  });

  conn.on("data", data => {
    console.log(data.toString());
    console.log('Press Ctrl-C to exit game');
    conn.end();
  });

  return conn;
};

module.exports = { connect };