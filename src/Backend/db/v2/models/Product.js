const Mongoose = require("mongoose");
const { handleError } = require("../../../error.js");
const Schema = Mongoose.Schema;
const ProductSchema = Schema({
  name: String,
  basePrice: Number,
  category: String,
  details: [
    {
      detailName: String,
      detailItems: [String],
    },
  ],
  modifier: {
    name: String,
    min: Number,
    max: Number,
  },
});

let productModel = Mongoose.model("product", ProductSchema);


async function createProduct(productData){
  let p = new productModel(productData);
  let pId = await p.save().catch(handleError)
  return pId._id.toString();
}

function getProduct(productId){
  return productModel.findById(productId).catch(handleError)
}


function addProduct(productData){
  let p = new productModel(productData);
  return p.save().catch(handleError);
}

function updateProduct(productId, updates){
  return productModel.findByIdAndUpdate(productId,updates);
}

function deleteProduct(productId){
  return productModel.findByIdAndRemove(productId);
}

function getProductsByCategory(category){
  return productModel.find({category:category}).catch(handleError);
}


function getCategories(){
  return productModel.find().distinct('category').catch(handleError);
}


module.exports = {
  createProduct,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getCategories,
  _model:  productModel
}

