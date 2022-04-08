import db from "./db";
import { io } from "./ioSocket";
import { userProfileData } from "./types";
const SingleProScrup = require("./SingleProScrup");

// app
io.on("connection", (socket: any) => {
  console.log("a user connected :D");
  socket.emit('connection','connectSuccess')
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
    db.getShoppingList()
  })
  socket.on("insertNewUser", async (msg: userProfileData) => {
    console.log('mgs',msg);
    db.insertNewUser(msg)
  })
  socket.on("getUserData", async () => {    
    db.getUserData()
  })
  socket.on("updateUserProfile", async (value:any) => {
    // console.log('mgs', msg);
    db.updateUserData(value)
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
