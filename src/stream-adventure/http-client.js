import { request } from "node:http";
import { stdin, stdout } from "node:process";

const req = request("http://localhost:8099/", { method: "POST" }, (res) => {
  res.pipe(stdout);
});

stdin.pipe(req);
