import db from "./db";
import { io } from "./ioSocket";
const SingleProScrup = require("./SingleProScrup");

// app
io.on("connection", (socket: any) => {
  console.log("a user connected :D");
  socket.on("updateShopingList", async (msg: string) => {
    console.log(msg);
    db.main(msg)
    // db.main('')
    // SingleProScrup.proNames(msg).then((result: any) => {
    //   console.log('pro', result);
    //   db.main(result)
    //   io.emit("getProduct", result);
    // })
  });
  socket.on("getShoppingList", async (msg: string) => {
    db.getShoppingList(io)
  })
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
