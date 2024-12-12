"use strict";

const { createServer } = require("node:http");
const { argv } = require("node:process");
const { URLSearchParams } = require("node:url");

const port = Number(argv[2]);
if (Object.is(NaN, port)) {
  throw new Error("the provided port must be a valid number", {
    cause: { port: argv[2] },
  });
}

const server = createServer(handleRequest);
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
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 */
function handleRequest(req, res) {
  const path = req.url.split("?")[0];

  switch (path) {
    case "/api/parsetime":
      return handleParsetime(req, res);
    case "/api/unixtime":
      return handleUnixtime(req, res);
    default:
      return notFound(res);
  }
}

/**
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 */
function handleParsetime(req, res) {
  const searchParams = new URLSearchParams(req.url.split("?")[1]);
  const date = new Date(searchParams.get("iso"));

  if (
    String(date) === "Invalid Date" ||
    date.toISOString() !== searchParams.get("iso")
  ) {
    return notFound(res);
  }

  if (req.method !== "GET") {
    return methodNotAllowed(res);
  }

  res.setHeader("content-type", "application/json");
  return res.end(
    JSON.stringify({
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    }),
  );
}

/**
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 */
function handleUnixtime(req, res) {
  const searchParams = new URLSearchParams(req.url.split("?")[1]);
  const date = new Date(searchParams.get("iso"));

  if (
    String(date) === "Invalid Date" ||
    date.toISOString() !== searchParams.get("iso")
  ) {
    return notFound(res);
  }

  if (req.method !== "GET") {
    return methodNotAllowed(res);
  }

  res.setHeader("content-type", "application/json");
  return res.end(JSON.stringify({ unixtime: date.getTime() }));
}

/**
 * responds with 404 - not found
 * @param {import("node:http").ServerResponse} res
 */
function notFound(res) {
  res.statusCode = 404;
  return res.end(`${res.req.url} Not Found`);
}

/**
 * responds with 405 - method not allowed
 * @param {import("node:http").ServerResponse} res
 */
function methodNotAllowed(res) {
  res.statusCode = 405;
  return res.end(`${res.req.method} Method Not Allowed.`);
}
