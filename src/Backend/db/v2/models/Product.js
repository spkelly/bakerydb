const Mongoose = require("mongoose");
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
  let pId = await p.save().catch(e=>console.log(e))
  return pId._id.toString();
}

function getProduct(){

}



module.exports = {
  createProduct,
  getProduct,
  _model:  productModel
}

