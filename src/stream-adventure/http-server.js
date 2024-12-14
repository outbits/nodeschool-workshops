import { createServer } from "node:http";
import { argv } from "node:process";
import { Transform } from "node:stream";

const port = Number(argv[2]);
if (Object.is(NaN, port)) {
  throw new Error("the provided port must be a valid number", {
    cause: { port: argv[2] },
  });
}

const server = createServer(function uppercase(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end(`${req.method} Method Not Allowed.`);
  }

  const uppercaser = new Transform({
    transform(chunk, encoding, next) {
      this.push(String(chunk).toUpperCase());
      next();
    },
  });

  res.setHeader("content-type", req.headers["content-type"] ?? "plain/text");
  req.pipe(uppercaser).pipe(res);
});

server
  .listen({ port }, () =>
    console.log(`listening to incoming connections from ${port}.`),
  )
  .on("close", () => console.log("server closed. THANK YOU! SEE YOU AGAIN..."))
  .on("error", function closeServer(err) {
    console.error("An error happened. Closing the server...", err);
    server.close((err) =>
      console.error("ERROR WHILE CLOSING THE SERVER.", err),
    );
  });
