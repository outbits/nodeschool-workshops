import { createReadStream } from "node:fs";
import { argv, stdout } from "node:process";

if (argv[2] == undefined) {
  throw new Error("a file path must be provided", { cause: { path: argv[2] } });
}

const a = createReadStream(argv[2]);
// do something useful maybe? e.g handle ENOENT
a.on("error", (err) => {
  throw new Error(err);
});

a.pipe(stdout);
