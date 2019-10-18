const mongoose = require("mongoose");
var OrderItemSchema = new mongoose.Schema({

  name: String,
  quantity: Number,
  price: Number,
  notes: String
},{_id:false});

var CustomerSchema = new mongoose.Schema({

  name: String,
  address: String,
  email: String,
  phone: String
},{_id:false});

var OrderSchema = new mongoose.Schema({
  orderDate: Date,
  customer: CustomerSchema,
  dateCreated: Date,
  orders: [OrderItemSchema]
});


let conn;
let orderModel;

OrderSchema.index({'$**':'text'});



function setup(cleanSetup){
  conn = mongoose.createConnection("mongodb://localhost:27017/bakerydb_dev", {
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
  }
}




function queryOrders(searchTerm){
  return new Promise ( resolve =>{
    orderModel.find({$text:{$search:searchTerm}})
    .lean()
    .exec((err,docs)=>{
      if(err){
        console.log(err);
      }
      // if docs are returned. convert each _id field to string
      // doc._id.toString() does not work when called from renderer
      // NOTE: Research why this is
      if(docs.length > 0) docs.forEach((doc)=> doc._id = doc._id.toString())
      
      resolve(docs);
    })
  });
}

function findById(id){
  console.log(id);
  return new Promise(resolve =>{
    orderModel.findById(id)
    .lean()
    .exec((err,doc)=>{
      console.log(mongoose.Types.ObjectId(doc._id).toString());
      doc._id = doc._id.toString()
      resolve(doc);
    })
  })
}


function addOrder(order){
  return new Promise ( resolve =>{
    
  });
}

function updateOrder(order){
  console.log(order._id);
  let id = order._id;
  order.orders = order.items;
  // order._id = mongoose.Types.ObjectId(order._id);
  // console.log(mongoose.Types.ObjectId(order._id).toString());
  return new Promise( resolve=>{
    orderModel.update({_id:id},order)
    .then((doc)=>{
      resolve(doc)
    })
    .catch((e)=>{
      console.log(e);
      console.log('an error ocurred')
    })  
  })
}

function disconnect(connection){
  mongoose.disconnect();
}



class Orders{
  constructor(){

  }

  queryOrders(searchTerm){
    return new Promise ( resolve =>{
  
    });
  }
  addOrder(order){
    return new Promise ( resolve =>{
      
    });
  }
}


module.exports = {
  setup,
  findById,
  updateOrder,
  disconnect,
  addOrder,
  queryOrders
}