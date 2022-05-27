import db from "./db";
import { io } from "./ioSocket";
import SingleProScrup from "./SingleProScrup";
import { userProfileData } from "./types";

// app
io.on("connection", (socket: any) => {
  console.log("a user connected :D");
  console.log("test");
  socket.emit('connection','connectSuccess')
  
  socket.on("addShopingList", async (msg: any) => {
    console.log(msg);
    db.addShopingList(msg)
  });
  socket.on("updateShopingList", async (objectData: any) => {
    db.updateShoppingList(objectData.shoppingListId, objectData.shoppingList)
  });
  socket.on("getShoppingList", async (id: string) => {
    db.getShoppingList(id)
  })
  socket.on("getShoppingListByEmail", async (email: string) => {
    db.getShoppingListByEmail(email)
  })
  socket.on("insertNewUser", async (msg: userProfileData) => {
    console.log('mgs',msg);
    db.insertNewUser(msg)
  })
  socket.on("getUserData", async (user:userProfileData) => {    
    db.getUserData(user)
  })
  socket.on("updateUserProfile", async (value:any) => {
    // console.log('mgs', msg);
    db.updateUserData(value)
  })
  socket.on("scrap", async (msg: string) => {
    // console.log(msg);
    SingleProScrup.proNames(msg).then((result: any) => {
      console.log('pro', result);
      // db.main(result)
      io.emit("getProduct", result);
    })
  });
})
// proNames("מים").then((result:any) => {
//   console.log('pro', result);
//   main(result)
//   // io.emit("getProduct", result);
// })
