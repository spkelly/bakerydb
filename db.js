var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/bakerydb_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected");
});

var OderItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  notes: String
});

var CustomerSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  phone: String
});

var OrderSchema = new mongoose.Schema({
  orderDate: Date,
  customer: [CustomerSchema],
  dateCreated: Date,
  orders: [OrderItemSchema]
});
