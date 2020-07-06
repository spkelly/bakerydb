const Mongoose = require("mongoose");

const Customer = Mongoose.Schema({
  name: {type:String, required: true, index: true},
  address: String,
  phone: String,
  email: {type:String, index: true}
});

Customer.index({name:"text",email:"text"})

module.exports = Customer;
