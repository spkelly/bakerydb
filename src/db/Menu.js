module.exports = function(dbInstance) {
  let db = dbInstance.db();
  let ObjectID = require("mongodb").ObjectID;

  const categoryCollection = db.collection("categories");
  const productCollection = db.collection("products");

  // returns all items from the menu
  async function getMenu() {
    return new Promise(async (resolve, reject) => {
      let allProducts = await productCollection.find({}, { _id: 0 }).toArray();
      resolve(allProducts);
    });
  }

  async function getProduct(productId) {
    console.log("[PRODUCT ID SEARCH] [ ", productId, " ]");
    return new Promise(async (resolve, reject) => {
      productCollection.findOne(
        { _id: ObjectID(productId) },
        { _id: 0 },
        (err, doc) => {
          if (err) reject(err);
          resolve(doc);
        }
      );
    });
  }

  function getAllProducts() {
    return new Promise(async (resolve, reject) => {
      let allProducts = await productCollection.find({}, { _id: 0 }).toArray();
      resolve(allProducts);
    });
  }

  function addFlavor(productId, flavor) {
    return new Promise(() => {});
  }

  function addTopping(productId, topping) {
    return new Promise(() => {});
  }

  function removeFlavor(productId, flavor) {
    return new Promise(() => {});
  }

  function removeTopping(productId, flavor) {
    return new Promise(() => {});
  }

  function getProductsByCategory(categoryId) {
    console.log("category id: ", categoryId);
    dbInstance;
    return new Promise((resolve, reject) => {
      productCollection
        .find({ categoryId: ObjectID(categoryId) })
        .toArray((err, result) => {
          resolve(result);
        });
    });
  }

  function updateProduct(productId, updates) {
    return new Promise(() => {});
  }

  function addCategory(name) {
    return new Promise(async () => {
      categoryCollection.insertOne({ name }, (err, result) => {
        if (err) console.error(err);
        resolve(result);
      });
    });
  }

  function getCategories() {
    return new Promise(async (resolve, reject) => {
      let allCategories;
      try {
        // allCategories = await categoryCollection.find({}).toArray();
        allCategories = await categoryCollection
          .aggregate([
            { $match: {} },
            { $project: { _id: { $toString: "$_id" }, name: 1 } }
          ])
          .toArray();
      } catch (e) {
        console.log("ERROR CAUGHT", e);
      }
      console.log("before manip", allCategories);
      let test = allCategories.map(catObject => catObject.name);
      console.log(test);
      resolve(allCategories);
    });
  }

  function removeCategory(name) {
    return new Promise(() => {});
  }

  return {
    getMenu,
    getProduct,
    addTopping,
    removeTopping,
    addFlavor,
    removeFlavor,
    getProductsByCategory,
    updateProduct,
    removeCategory,
    addCategory,
    getAllProducts,
    getCategories
  };
};
