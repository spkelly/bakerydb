const DB_URL = "mongodb://localhost:27017/bakerydb_v2_dev";
const mongoClient = require("mongodb").MongoClient;
const collection = require("./collections");
const mongoose = require("mongoose");

// async function setupDB(db, url) {
//   return new Promise((resolve, reject) => {
//     db.connect(url, { useUnifiedTopology: true }, (err, database) => {
//       if (err) reject(err);
//       resolve(database);
//     });
//   })
// }

// function toObjectId(string){
//   return mongodb.ObjectID(string)
// }

const MONGOOS_OPTS = {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true,
};

class Database {
  async constructore(dbPath = DB_URL) {
    this.dbPath = dbPath;
    this.collections = null;
  }
  async init() {
    let a = await mongoose.connect(DB_URL, MONGOOS_OPTS);
  }

  async dropAll() {
    let collectionNames = Object.keys(mongoose.connection.collections);
    for (let collectionName of collectionNames) {
      let collection = mongoose.connection.collections[collectionName];
      try {
        await collection.drop();
      } catch (err) {}
    }
  }

  async close() {
    mongoose.connection.close();
  }
}

module.exports = Database;

// module.exports = async function(dbURL=DB_URL) {
//   let database = await setupDB(mongoClient, dbURL).catch(e => {
//     console.log("ERROR: ", e);
//   });

//   if(!database){
//     return undefined;
//   }

//   return {
//     _dbInstance:database,
//     Orders: new collection.Orders(database),
//     Menu: null,
//     close: ()=> database.close(),
//     toObjectID:toObjectId
//   };
// };
