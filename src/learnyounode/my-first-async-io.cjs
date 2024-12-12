"use strict";

const { readFile } = require("node:fs");

// could go the promise route but this is also ok
readFile(process.argv[2], function logFileLineCount(err, data) {
  if (err) {
    throw err;
  }

  console.log(String(data).split("\n").length - 1);
});
