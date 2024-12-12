"use strict";

const { argv } = require("node:process");
const mymodule = require("./mymodule.cjs");

if (argv[3] == undefined) {
  throw new error("an extension must be provided, even if empty", {
    cause: { ext: argv[3] },
  });
}

const dir = argv[2];
const ext = argv[3];

mymodule(dir, ext, function log(err, filenames) {
  if (err) {
    console.error("there was an error!", err);
  }

  filenames.forEach((name) => {
    console.log(name);
  });
});
