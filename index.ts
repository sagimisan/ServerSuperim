
const express = require("express");
const db = require("./db");
const SingleProScrup = require("./SingleProScrup");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;

// app
io.on("connection", (socket: any) => {
  console.log("a user connected :D");
  socket.on("scrap", async (msg: string) => {
    SingleProScrup.proNames(msg).then((result: any) => {
      console.log('pro', result);
      db.main(result)
      io.emit("getProduct", result);
    })
  });
})
// proNames("מים").then((result:any) => {
//   console.log('pro', result);
//   main(result)
//   // io.emit("getProduct", result);
// })
server.listen(port, () => console.log("server running on port:" + port));