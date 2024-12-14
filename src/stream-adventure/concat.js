import { stdin, stdout } from "node:process";
import { Writable } from "node:stream";

stdin.pipe(
  concat(function (data) {
    stdout.write(data.split("").reverse().join(""));
  }),
);

// mimics the concat-stream package used in the exercise
function concat(cb) {
  let content = "";

  return new Writable({
    write(chunk, encoding, next) {
      content += String(chunk);
      next();
    },
    final(next) {
      cb(content);
      next();
    },
  });
}
