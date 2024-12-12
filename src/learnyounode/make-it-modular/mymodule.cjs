"use strict";

const fs = require("node:fs");
const { extname } = require("node:path");

module.exports = function (dirname, ext, cb) {
  fs.readdir(dirname, function handleFilesWithRightExt(err, filenames) {
    if (err) {
      return cb(err);
    }

    // handles the case of extensionless filter, ""
    if (ext !== "") {
      ext = `.${ext}`;
    }

    cb(
      null,
      filenames.filter((name) => extname(name) === ext),
    );
  });
};
