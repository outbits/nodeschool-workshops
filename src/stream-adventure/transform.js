import { stdin, stdout } from "node:process";
import { Transform } from "node:stream";

// I don't want to use an external library
// we can also use async generators + Transform#from
const stream = new Transform({
  transform(chunk, encoding, next) {
    this.push(String(chunk).toUpperCase());
    next();
  },
});

stdin.pipe(stream).pipe(stdout);
