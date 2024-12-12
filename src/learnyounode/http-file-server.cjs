"use strict";

const { createReadStream } = require("node:fs");
const { createServer } = require("node:http");
const { argv } = require("node:process");

if (argv[3] == undefined) {
  throw new Error("a location for the file to serve must be provided", {
    cause: { filePath: argv[3] },
  });
}

const port = Number(argv[2]);
if (Object.is(NaN, port)) {
  throw new Error("the provided port must be a valid number", {
    cause: { port: argv[2] },
  });
}

const server = createServer(function streamFile(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  createReadStream(argv[3]).pipe(res);
});

server
  .listen({ port }, () =>
    console.log(`listening to incoming connections from ${port}.`),
  )
  .on("close", () => console.log("server closed. THANK YOU! SEE YOU AGAIN..."))
  .on("error", function closeServer(err) {
    console.error("An error happened. Closing the server...", err);
    server.close((err) => console.log("ERROR WHILE CLOSING THE SERVER.", err));
  });
