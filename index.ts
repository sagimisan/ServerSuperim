import db from "./db";
import { io } from "./ioSocket";
import SingleProScrup from "./SingleProScrup";
import { userProfileData } from "./types";

// app
io.on("connection", (socket: any) => {
  console.log("a user connected :D");
  console.log("test");
  socket.emit('connection','connectSuccess')
  
  socket.on("addShoppingList", async (msg: any, CB?:(msg:string)=>void) => {
    console.log(msg);
    db.addShoppingList(msg, CB)
  });
  socket.on("joinToRoom", async (shoppingListId: any) => {
    // io.emit("joinToRoom", `${socket.id}`)
    console.log('joinToRoom',shoppingListId);
    
    socket.join(shoppingListId)
    // socket.emit("getDataFromServer", `${socket.id}`)

  });
  socket.on("updateShoppingList", async (objectData: any, CB?:(msg:string)=>void) => {
    db.updateShoppingList(objectData.shoppingListId, objectData.shoppingList,CB)
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
  socket.on("getUserData", async (email:string,CB?:(msg:string)=>void) => { 
    console.log('here',);
       
    db.getUserData(email,CB)
  })
  socket.on("updateUserProfile", async (value:any,CB?:(msg:string)=>void) => {    
    db.updateUserProfile(value,CB)
  })
  socket.on("shareShoppingList", async (mail:any,CB?:(msg:string)=>void) => {
    console.log('value',mail);
    db.shareShoppingList(mail,CB)
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
