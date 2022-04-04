import db from "./db";

const express = require("express");
const SingleProScrup = require("./SingleProScrup");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;
const { MongoClient } = require("mongodb");
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
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
    // console.log(msg);
    await client.connect();
    const db = client.db('shoppingLists');
    db.collection('lists').findOne({},(err:any,result:any)=>{
      if (err) throw err;
      console.log('res',result);
          io.emit("getShoppingList",result);
      // return result
    });
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
server.listen(port, () => console.log("server running on port:" + port));