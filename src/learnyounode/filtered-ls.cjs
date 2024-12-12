"use strict";

const { readdir } = require("node:fs");
const { extname } = require("node:path");
const { argv } = require("node:process");

if (argv[3] == undefined) {
  throw new error("an extension must be provided, even if empty", {
    cause: { ext: argv[3] },
  });
}

const dir = argv[2];
const ext = argv[3] && `.${argv[3]}`;

readdir(dir, function logFilesWithRightExt(err, filenames) {
  if (err) {
    throw err;
  }

  filenames.forEach(function logIfHasCorrectExt(name) {
    if (extname(name) === ext) {
      console.log(name);
    }
  });
});
