import { stdin, stdout } from "node:process";
import { Transform } from "node:stream";

const stream = (function () {
  let count = 0;

  return new Transform({
    transform(chunk, encoding, next) {
      if (count++ % 2 == 0) {
        this.push(String(chunk).toLowerCase());
      } else {
        this.push(String(chunk).toUpperCase());
      }

      next();
    },
  });
})();

stdin.pipe(stream).pipe(stdout);
