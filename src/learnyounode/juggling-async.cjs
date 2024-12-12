"use strict";

const { get } = require("node:http");
const { argv } = require("node:process");

const responses = [];

// nowadays there's Promise.all/allSettled
argv.slice(2).forEach((argv, i) => {
  get(argv, collectThenLogAll(i));
});

function collectThenLogAll(idx) {
  return function collectThenLog(res) {
    res.setEncoding("utf8");

    res.on("error", (error) => {
      responses[idx] = { error };
    });

    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      responses[idx] = { data };
      logOnceResponsesFinish();
    });
  };
}

function logOnceResponsesFinish() {
  if (responses.length < 3 || responses.includes(undefined)) {
    return;
  }

  responses.forEach(({ err, data }) => {
    if (err) {
      return console.log(err);
    }

    console.log(data);
  });
}
