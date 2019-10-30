const orders = require("./Orders");
const menu = require("./Menu");
const mongoClient = require("mongodb").MongoClient;
const DB_URL = "mongodb://localhost:27017/bakerydb_dev";

async function setupDB(db) {
  return new Promise((resolve, reject) => {
    db.connect(DB_URL, { useUnifiedTopology: true }, (err, database) => {
      if (err) reject(err);
      resolve(database);
    });
  }).catch(e => {
    console.log("ERROR: ", e);
  });
}

module.exports = async function() {
  let database = await setupDB(mongoClient);

  return {
    Orders: orders(database),
    Menu: menu(database),
    close: ()=> database.close(),
    _dbInstance:database
  };
};
