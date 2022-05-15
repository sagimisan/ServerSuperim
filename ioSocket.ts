
const express = require("express");
const app = express();
const server = require("http").createServer(app);
export const io = require("socket.io")(server);
const port = 8080;
// console.log(server);

server.listen(port, () => console.log("server running on port:" + port));
