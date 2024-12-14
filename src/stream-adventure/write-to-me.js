import { stdin } from "node:process";
import { Writable } from "node:stream";

const stream = new Writable({
  write(chunk, encoding, next) {
    console.log(`writing: ${chunk}`);
    next();
  },
});

stdin.on("data", (chunk) => stream.write(chunk));
