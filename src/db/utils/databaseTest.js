const mongoClient = require("mongodb").MongoClient;

const DB_URL = "mongodb://localhost:27017/bakerydb_dev_test";

async function setupDB() {
  return new Promise((resolve, reject) => {
    mongoClient.connect(
      DB_URL,
      {
        useUnifiedTopology: true
      },
      (err, database) => {
        if (err) reject(err);
        resolve(database);
      }
    );
  }).catch(e => {
    console.log("ERROR: ", e);
  });
}

let menuItemOne = {
  name:"Display Cake",
  dateCreated: new Date(),
  dateModified: new Date(),
  price: 2.50,
  options: ['serving size'],
  flavors: ['chocolate', 'vanilla','lemon'],
  toppings:['buttercream','chocolate buttercream'],
  categoryId: null
}


let menuItemTwo = {
  name:"Sheet Cake",
  dateCreated: new Date(),
  dateModified: new Date(),
  price: 2.50,
  options: ['serving size'],
  flavors: ['chocolate', 'vanilla','lemon'],
  toppings:['buttercream','chocolate buttercream'],
  categoryId: null
}

async function createMenuItem(db,menuItem){
  return db.insertOne(menuItem,(err,resp)=>{
    if(err){console.log(err)}
  })
}

setupDB().then(async client => {
  // Proccess to inserting a 

  
  // Get category id
  //  


  let db = client.db();
  let catagoryCollection = db.collection("categories");
  let productCollection = db.collection('products');
  let resp = await catagoryCollection.insertOne({ name: "Cakes" });
  menuItemOne.categoryId = resp.insertedId;
  menuItemTwo.categoryId = resp.insertedId;
  await createMenuItem(productCollection,menuItemOne);
  await createMenuItem(productCollection,menuItemTwo);
  let start = new Date();
  let productArray = await productCollection.find({categoryId:resp.insertedId}).explain("executionStats");
  let end = new Date();
  console.log('Time elapsed: ',end-start)
  
  client.close();
});


