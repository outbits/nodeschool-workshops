import { argv, stdout } from "node:process";
import { Readable } from "node:stream";

if (argv[2] == undefined) {
  throw new Error("content to stream must be provided", {
    cause: { content: argv[2] },
  });
}

const stream = new Readable({ read() {} });
stream.push(argv[2]);
stream.pipe(stdout);
