import emit from "./emit";
import { userProfileData } from "./types";

const { MongoClient } = require("mongodb");
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'shoppingLists';

export default class db {
  public static async main(result: string) {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('lists');
    collection.insertOne({ result })
    console.log('collection.find()', result);
    // the following code examples can be pasted here...
    return 'done.';

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
  public static async getShoppingList() {
    await client.connect();
    const db = client.db("shoppingLists");
    db.collection('lists').findOne({
      result:      '[{"txt":"שתייה","id":"55677578-cd69-4d41-8d2b-e5d70d4739bd"},{"txt":"ועוד","id":"f8b46f80-cfb4-47c7-834d-a75b09b8cef4"},{"txt":"מוצרים","id":"13bea0ca-0120-4c97-b2f5-d71a2fefefd7"},{"txt":"ועוד כמה דברים","id":"954a2b0b-a84c-4c48-b1d1-923b3b4d56b9"}]'
    }, (err: any, result: any) => {
      if (err) throw err;
      emit("getShoppingList", result);
    });
  }
  public static async insertNewUser(value:userProfileData) {
    await client.connect();
    const db = client.db("usersData");
    const collection = db.collection('users');
    collection.insertOne(value)
  }
  public static async getUserData() {
    await client.connect();
    const db = client.db("usersData");
    db.collection('users').findOne({},
      (err: any, result: any) => {
        if (err) throw err;
        emit("getUserData", result);
      })
  }
  //getting array with the prev user data [0] and the new [1]
  public static async updateUserData(value:userProfileData[]) {
    await client.connect();
    var dbo = client.db("usersData");    
    var myquery = value[0].email;
    var newvalues = { $set: { name:value[1].name,hourPrice:value[1].hourPrice} };
    dbo.collection("users").updateOne({email:myquery}, newvalues, function (err:any, res:any) {
      if (err) throw err;
      console.log("1 document updated");
    });
  }
}
// main()
//   .then(console.log)
//   .catch(console.error)
  // .finally(() => client.close());