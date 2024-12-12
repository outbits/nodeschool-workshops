"use strict";

const { get } = require("node:http");
const { argv } = require("node:process");

const request = get(argv[2], function logResponseChunks(res) {
  res.setEncoding("utf8");

  res.on("error", console.error);
  res.on("data", console.log);
});

request.on("error", console.error);
