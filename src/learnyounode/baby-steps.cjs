"use strict";

const { argv } = require("node:process");

let sum = 0;

for (let i = 2; i < argv.length; i++) {
  const num = Number(argv[i]);

  if (Object.is(NaN, num)) {
    throw new Error("encountered an unvalid number", {
      cause: { invalidArg: argv[i] },
    });
  }

  sum += num;
}

console.log(sum);
