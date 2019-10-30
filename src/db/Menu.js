module.exports = function(dbInstance){
  let db = dbInstance.db();
  let ObjectID = require('mongodb').ObjectID;   
  
  const categoryCollection = db.collection('categories');
  const productCollection = db.collection('products');

  
  // returns all items from the menu
  async function getMenu(){
    return new Promise(async(resolve,reject)=>{
      let allProducts = await productCollection.find({},{_id:0}).toArray();
      resolve(allProducts);
    })
  }

  async function getProduct(productId){
    console.log("[PRODUCT ID SEARCH] [ ",productId,' ]')
    return new Promise(async(resolve,reject)=>{
      productCollection.findOne({_id:ObjectID(productId)},{_id:0},(err,doc)=>{
        if(err) reject(err);
        resolve(doc);
      })
    })
  }

  function addFlavor(productId, flavor){
    return new Promise(()=>{})
  }
  
  function addTopping(productId, topping){
    return new Promise(()=>{})
  }

  function removeFlavor(productId, flavor){
    return new Promise(()=>{})
  }
  
  function removeTopping(productId, flavor){
    return new Promise(()=>{})
  }

  function getProductsByCategory(cagegoryId){
    return new Promise(()=>{})
  }

  function updateProduct(productId, updates){
    return new Promise(()=>{})
  }

  function addCategory(name){
    return new Promise(()=>{})
  }
  
  function getCategories(){
    return new Promise(async(resolve,reject)=>{
      let allCategories = categoryCollection.distinct('name')
      .catch((e)=>reject(e));
      resolve(allCategories);
    })
  }

  function removeCategory(name){
    return new Promise(()=>{})
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
    getCategories
  }
}