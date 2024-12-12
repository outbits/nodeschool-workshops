"use strict";

const { readFileSync } = require("node:fs");

// let's just throw the error if it happens
const content = readFileSync(process.argv[2], { encoding: "utf8" });
console.log(content.split("\n").length - 1);
