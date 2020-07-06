const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const ProductSchema = Schema({
  name: String,
  basePrice: Number,
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

module.exports = Mongoose.model("product", ProductSchema);
