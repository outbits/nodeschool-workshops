"use strict";

const { get } = require("node:http");
const { argv } = require("node:process");

const request = get(argv[2], function logResponse(res) {
  res.setEncoding("utf8");
  res.on("error", console.error);

  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    console.log(data.length);
    console.log(data);
  });
});

request.on("error", console.error);
