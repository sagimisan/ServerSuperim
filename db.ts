const { MongoClient } = require("mongodb");
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'shoppingLists';

export default class db{
    public static async main(result:string) {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('lists');
    collection.insertOne({result})
    console.log('collection.find()',result);
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
    // Use connect method to connect to the server
    await client.connect();
    const db = client.db(dbName);
    db.collection('lists').findOne({},(err:any,result:any)=>{
      if (err) throw err;
      console.log('res',result);
      return result
    });
}

}
// main()
//   .then(console.log)
//   .catch(console.error)
  // .finally(() => client.close());