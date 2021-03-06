import emit from "./emit";
import { Globals } from "./Globals";
import { io } from "./ioSocket";
import { userProfileData } from "./types";

const { MongoClient, ServerApiVersion } = require('mongodb');
const url = Globals.URL;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// Database Name
const dbName = 'shoppingLists';

export default class db {
  public static async updateShoppingList(shoppingListId: string, shoppingList: any,CB?:(msg:string)=>void) {

    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to DB');
    console.log('shoppingListId ', shoppingListId);
    console.log('shoppingList',shoppingList);
    
    const db = client.db(dbName);
    const collection = db.collection('lists');
    var newvalues = { $set: {shoppingList:shoppingList.shoppingList,title:shoppingList.title,} };
    console.log('newvalues',newvalues);
    
    collection.updateOne({shoppingListId:shoppingListId} , newvalues, function (err: any, res: any) {
     
      if (err) {
        console.log('err',err);
        
        throw err};
      // console.log("1 shopping list updated");
      io.to(shoppingListId).emit("getDataFromServer", shoppingList)
      console.log('shoppingList', shoppingList);
      CB&&CB(shoppingList)
    });
    // the following code examples can be pasted here...
    // return 'done.';

    // // Use connect method to connect to the server
    // await client.connect();
    // console.log('Connected successfully to server');
    // const db = client.db(dbName);
    // const collection = db.collection('products');
    // collection.insertOne({result})
    // console.log('collection.find()',result);
    // // the following code examples can be pasted here...
    // return 'done.';
  }
  public static async addShoppingList(result: any, CB?:(msg:string)=>void) {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to DB');
    const db = client.db(dbName);
    const collection = db.collection('lists');
    collection.insertOne(result)
    CB(JSON.stringify(result))
    // console.log('collection.find()', result);
    return 'done.';

  }
  public static async getShoppingList(id: string,CB?:(msg:string)=>void) {
    console.log('id',id);
    await client.connect();
    console.log('Connected successfully to DB');

    const db = client.db("shoppingLists");
    db.collection('lists').findOne({ shoppingListId: id },
      (err: any, result: any) => {
        if (err) throw err;
        console.log(result);
        CB(JSON.stringify(result))
        // emit("getShoppingList", result);
      });
  }
  public static async getShoppingListsIDS(email: string,CB?:(msg:string)=>void) {
    console.log('id',email);
    await client.connect();
    console.log('Connected successfully to DB');

    const db = client.db("shoppingLists");
    db.collection('lists').findOne({ email: email },
      (err: any, result: any) => {
        if (err) throw err;
        console.log(result);
        CB(JSON.stringify(result))
        // emit("getShoppingList", result);
      });
  }
  public static async shareShoppingList(email: string,CB?:(msg:string)=>void) {
    console.log('email',email);
    await client.connect();
    console.log('Connected successfully to DB');
    const db = client.db("usersData");
    db.collection('users').findOne({ email: email.toLowerCase().trim() },
      (err: any, result: any) => {
        if (err) throw err;
        console.log('shareShoppingList result' , result);
        CB(JSON.stringify(result))
        // emit("getShoppingListByEmail", result.shoppingListId);
      });
  }
  public static async getShoppingListByEmail(email: string,CB?:(msg:string)=>void) {
    console.log(email);
    await client.connect();
    console.log('Connected successfully to DB');

    const db = client.db("usersData");
    db.collection('users').findOne({ email: email.toLowerCase().trim() },
      (err: any, result: any) => {
        if (err) throw err;
        console.log(result);
        CB(result.shoppingListId)
        // emit("getShoppingListByEmail", result.shoppingListId);
      });
  }
  public static async checkUserExist(email: string) {
    console.log(email);
    await client.connect();
    console.log('Connected successfully to DB');
    const db = client.db("usersData");
    db.collection('users').findOne({ email: email },
      (err: any, result: any) => {
        if (err) throw err;
        emit("checkUserExist", result!==null);
      });
  }
  public static async insertNewUser(value: userProfileData) {
    await client.connect();
    console.log('Connected successfully to DB');

    const db = client.db("usersData");
    const collection = db.collection('users');
    collection.insertOne(value)
  }
  public static async getUserData(email: string,CB?:(msg:string)=>void) {
    console.log('getUserData');
    
    await client.connect();
    console.log('Connected successfully to DB');

    const db = client.db("usersData");
    db.collection('users').findOne({ email: email },
      (err: any, result: any) => {
        if (err) throw err;
        // emit("getUserData", result);
        CB(JSON.stringify(result))
      })
  }
  public static async updateUserProfile(value: userProfileData[],CB?:(msg:string)=>void) {
    console.log('updateUserProfile');
    console.log('value',value[1]);
    
    await client.connect();
    console.log('Connected successfully to DB');

    var dbo = client.db("usersData");
    var myquery = value[0].email;
    var newvalues = { $set: { name: value[1].name, hourPrice: value[1].hourPrice, shoppingListId: value[1].shoppingListId,shoppingListsIDS: value[1].shoppingListsIDS } };
    dbo.collection("users").updateOne({ email: myquery }, newvalues, function (err: any, res: any) {
      if (err) throw err;
      console.log("1 document updated");
      console.log('newvalues',value[1]);
      console.log('11111111111111111111111111111111',CB);
      
      CB&&CB(JSON.stringify(value[1]))
    });
  }
}
// main()
//   .then(console.log)
//   .catch(console.error)
  // .finally(() => client.close());