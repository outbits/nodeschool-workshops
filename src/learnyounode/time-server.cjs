"use strict";

const { createServer } = require("node:net");
const { argv } = require("node:process");

const port = Number(argv[2]);
if (Object.is(NaN, port)) {
  throw new Error("the provided port must be a valid number", {
    cause: { port: argv[2] },
  });
}

const server = createServer(function sendFormattedDatetime(socket) {
  socket.end(getformattedNow() + "\n");
});

server
  .listen({ port }, () =>
    console.log(`listening to incoming connections from ${port}.`),
  )
  .on("close", () => console.log("server closed. THANK YOU! SEE YOU AGAIN..."))
  .on("drop", () => console.log("a connection was dropped."))
  .on("error", function closeServer(err) {
    console.error("An error happened. Closing the server...", err);
    server.close((err) => console.log("ERROR WHILE CLOSING THE SERVER.", err));
  });

/**
 * formats date parts other than year to at least 2 digits
 */
function getformattedNow() {
  const date = new Date();
  const year = date.getFullYear();
  const month = format(date.getMonth() + 1);
  const day = format(date.getDate());
  const hours = format(date.getHours());
  const minutes = format(date.getMinutes());

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * prepends a 0 to a date part if it's only 1 digit
 * @param {Number} datePart e.g month number
 * @returns {String} the date part with at least 2 digits
 */
function format(datePart) {
  return datePart < 10 ? `0${datePart}` : String(datePart);
}
