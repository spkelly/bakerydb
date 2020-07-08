const Mongoose = require("mongoose");
const CustomerSchema = require("./Customer");
const Schema = Mongoose.Schema;
const { handleError } = require("../../../error.js");
const { result } = require("lodash");

const OrderItemSchema = new Schema({
  description: String,
  price: Number,
  quantity: Number,
  notes: String,
});

const OrderSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now},
  customer: CustomerSchema,
  orderItems: [OrderItemSchema],
  notes: { type: String, default: null },
  orderDate: { type: Date, default: null },
  datePaid: { type: Date, default: null },
  hasPaid: { type: Boolean, default: false },
  paymentType: { type: String, default: "NONE" },
  hasTip: { type: Boolean, default: false },
  deliveryCharge: { type: Number, default: 0 },
  taxRate: { type: Number, default: 7.75 },
  hasTax: { type: Boolean, default: false },
  invoiceRef: { type: Schema.Types.ObjectId, default: null },
});

OrderSchema.index({'$**': 'text'},{background:false})
let Order = Mongoose.model("order", OrderSchema);



async function createOrder(orderData) {
  let o = new Order(orderData);
  let result = await o.save().catch((e) => {
    throw new Mongoose.Error();
  });
  return result._id.toString();
}

// Returns a promise
function getOrder(orderId) {
  return Order.findById(orderId).lean().catch(handleError);
}

// Returns a promise
function queryOrders(query) {
  return Order.find({ 
    $text: { $search: query }, 
    // $project:{
    //   _id: { $toString: "$_id" },
    //   "customer.name": 1,
    //   "customer.date": 1,
    //   dateCreated: 1,
    //   orderDate: 1,
    // } 
  } 
  ).catch(handleError);
}


/* 

input
{
  customer:{
    name: "Test",
    address: "1201 Balsam Ave."
  },
  hasTip:false,
  hasDelivery:true
}

output

{
  "cutomer.name":"Test",
  "customer.address": "1201 Balsam Ave.",
  "hasTip": false,
  "hasDelivery": true
}


    I want to loop through the object keys and test if they are themselves objects


    if they are not objects I want to add them to the result object
    if they are objects I want to append the parent field name and add them to the result object








    flatten obj(input)
      input = {
        hasTip:false,
        customer:{
          name: "Test",
          address: "1201 Balsam Ave."
        },
        hasDelivery:true
      }
      res = {}   ||  res = {hasTip:False}

      for loop A
      1
        feild = hasTip
        if(typeof(input.hasTip) == obj)? false
          res.hasTip = input.hasTip;
      2
        field = customer
        if(typeof(input.hasTip) == obj)? true
          fObj = {name: "Test", Address: 1201 Balsam Ave}
          flattenObject(input.customer)
            input = {
              name: "Test",
              address: "1201 Balsam Ave."
            }
            res = {}


            for loop B
            1
              field = name
          fObj = {name: "Test", Address: 1201 Balsam Ave}

          for(let attr in jObj){
            res[`${field}.{attr}`] = fObj[addr]
          }


*/

function flattenObject(obj){
  let res = {};

  for(let field in obj){
    if(typeof(obj[field]) == 'object'){
      let fObj = flattenObject(obj[field]);
      for(let subField in fObj){
        res[`${field}.${subField}`] = fObj[subField]; 
      }
    }
    else{
      res[field] = obj[field];
    }
  }
  return res;
}

// must take a complete order object
function updateOrder(orderId, changes) {
  let flatChanges = flattenObject(changes);
  changes.updatedAt = new Date();
  return Order.findByIdAndUpdate(orderId, {$set:flatChanges},{new:true}).lean().catch(handleError);
}

// Returns a promise
function deleteOrder(orderId) {
  return Order.findByIdAndDelete(orderId).catch(handleError);
}

function getUnpaid() {
  return Order.aggregate([
    { $match: { hasPaid: false } },
    {
      $project: {
        _id: { $toString: "$_id" },
        "customer.name": 1,
        "customer.date": 1,
        hasPaid: 1,
        dateCreated: 1,
        orderDate: 1,
      },
    },
  ]).catch(handleError);
}




module.exports = {
  createOrder,
  getOrder,
  queryOrders,
  updateOrder,
  deleteOrder,
  getUnpaid,
  _model: Order,
};
