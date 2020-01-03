const orders = require("./Orders");
const menu = require("./Menu");
const mongodb = require('mongodb');
const DB_URL = "mongodb://localhost:27017/bakerydb_dev";
const mongoClient = mongodb.MongoClient;


async function setupDB(db, url) {
  return new Promise((resolve, reject) => {
    db.connect(url, { useUnifiedTopology: true }, (err, database) => {
      if (err) reject(err);
      resolve(database);
    });
  }).catch(e => {
    console.log("ERROR: ", e);
  });
}


function toObjectId(string){
  return mongodb.ObjectID(string)
}

module.exports = async function(dbURL=DB_URL) {
  let database = await setupDB(mongoClient, dbURL);

  return {
    _dbInstance:database,
    Orders: orders(database),
    Menu: menu(database),
    close: ()=> database.close(),
    toObjectID:toObjectId
  };
};
