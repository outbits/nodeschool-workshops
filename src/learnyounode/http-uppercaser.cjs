"use strict";

const { createServer } = require("node:http");
const { argv } = require("node:process");
const { Transform } = require("node:stream");

const port = Number(argv[2]);
if (Object.is(NaN, port)) {
  throw new Error("the provided port must be a valid number", {
    cause: { port: argv[2] },
  });
}

const server = createServer(sendUppercasedBody);
server
  .listen({ port }, () =>
    console.log(`listening to incoming connections from ${port}.`),
  )
  .on("close", () => console.log("server closed. THANK YOU! SEE YOU AGAIN..."))
  .on("error", function closeServer(err) {
    console.error("An error happened. Closing the server...", err);
    server.close((err) => console.log("ERROR WHILE CLOSING THE SERVER.", err));
  });

/**
 *
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 */
function sendUppercasedBody(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end(`${req.method} Method Not Allowed.`);
  }

  /*
   * there are other ways to do this such as:
   * - using Stream#pipeline with our async generator to handle backpressure and clean up:
   *   pipeline(req, capitalize, res, (err) => { console.error(err) })
   *
   * - using the experimental (as of node 21) Stream#map:
   *   req.map((chunk) => String(chunk).toUpperCase()).pipe(res);
   *
   * - either implementing a custom class extending Transform that implements _transform,
   * or giving it the transform implementation when instanciating:
   *   const uppercaser = new Transform({
   *     transform(chunk, encoding, callback) {
   *       callback(null, String(chunk).toUpperCase());
   *     },
   *   });
   *   req.pipe(uppercaser).pipe(res)
   */
  req.pipe(Transform.from(capitalize)).pipe(res);
}

/**
 * transform an async iterable's chunks into uppercase. Meant to be used with streams
 * @param {AsyncIterable<string>} source
 */
async function* capitalize(source) {
  for await (const chunk of source) {
    yield String(chunk).toUpperCase();
  }
}
