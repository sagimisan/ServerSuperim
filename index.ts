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
  socket.on("joinToRoom", async (shoppingListId: any) => {
    // io.emit("joinToRoom", `${socket.id}`)
    console.log('joinToRoom',shoppingListId);
    
    socket.join(shoppingListId)
    // socket.emit("getDataFromServer", `${socket.id}`)

  });
  socket.on("updateShopingList", async (objectData: any) => {
    db.updateShoppingList(objectData.shoppingListId, objectData.shoppingList)
  });
  socket.on("getShoppingList", async (id: string,CB?:(msg:string)=>void) => {
    // CB('SUCCEED!!!')
    console.log('is',id);
    
    db.getShoppingList(id,CB)
  })
  socket.on("getShoppingListByEmail", async (email: string,CB?:(msg:string)=>void) => {
    db.getShoppingListByEmail(email,CB)
  })
  socket.on("checkUserExist", async (email: string) => {
    console.log('mgs',email);
    db.checkUserExist(email)
  })
  socket.on("insertNewUser", async (msg: userProfileData) => {
    console.log('mgs',msg);
    db.insertNewUser(msg)
  })
  socket.on("getUserData", async (user:userProfileData) => {    
    db.getUserData(user)
  })
  socket.on("updateUserProfile", async (value:any) => {
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
