const mongoose = require("mongoose");
const mongoClient = require("mongodb").MongoClient;

let db;
const DB_URL = "mongodb://localhost:27017/bakerydb_dev";

var OrderItemSchema = new mongoose.Schema(
  {
    name: String,
    quantity: Number,
    price: Number,
    notes: String
  },
  { _id: false }
);

var CustomerSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    email: String,
    phone: String
  },
  { _id: false }
);

var OrderSchema = new mongoose.Schema({
  orderDate: Date,
  customer: CustomerSchema,
  dateCreated: Date,
  orders: [OrderItemSchema],
  isTaxed: Boolean,
  deliveryCharge: Number
});

var ProductSchema = new mongoose.Schema({
  catagoryID: mongoose.Types.ObjectId,
  name: String,
  price: Number
});

var CatagorieSchema = new mongoose.Schema({});

let conn;
let orderModel;



const testQuery = {
  id:1234,
  customerName : "Sean",
  email: "Spkelly18@gmail.com",
  dateCreated: "new Date",
  dateModified: "new Date",
  oderDate: "new Date",
  address: '1201 Balsam AVe.',
  items: [
  {
    name:"Display Cake",
    quantity: 1,
    options:{servingSize:20},
    price: 2.50,
    flavor:"test",
    topping: "Test"
  },
  {
    name:"CakePops",
    quantity: 15,
    options:{servingSize:20},
    price: 2.50,
    flavor:"test",
    topping: "Test"
  }
],

}

OrderSchema.index({ "$**": "text" });

async function setup(cleanSetup) {
  conn = await mongoose.createConnection(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  // if(cleanSetup){
  //   conn.dropDatabase()
  // }

  orderModel = conn.model("Order", OrderSchema);
  // await orderModel.createIndexes({'customer.name':'text','customer.email':'text'})

  return {
    connection: conn,
    orderModel
  };
}

function queryOrders(searchTerm) {
  return new Promise(resolve => {
    orderModel
      .find({ $text: { $search: searchTerm } })
      .lean()
      .exec((err, docs) => {
        if (err) {
          console.log(err);
        }
        // if docs are returned. convert each _id field to string
        // doc._id.toString() does not work when called from renderer
        // NOTE: Research why this is
        if (docs.length > 0)
          docs.forEach(doc => (doc._id = doc._id.toString()));

        resolve(docs);
      });
  });
}

function findById(id) {
  return new Promise(resolve => {
    orderModel
      .findById(id)
      .lean()
      .exec((err, doc) => {
        doc._id = doc._id.toString();
        resolve(doc);
      });
  });
}

function addOrder(order) {
  return new Promise(resolve => {});
}

function updateOrder(order) {
  let id = order._id;
  order.orders = order.items;
  return new Promise(resolve => {
    orderModel
      .update({ _id: id }, order)
      .then(doc => {
        resolve(doc);
      })
      .catch(e => {
        console.log(e);
      });
  });
}

function disconnect(connection) {
  mongoose.disconnect();
}


module.exports = {
  setup,
  findById,
  updateOrder,
  disconnect,
  addOrder,
  queryOrders
};

