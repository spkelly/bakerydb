const Mongoose = require("mongoose");
const CustomerSchema = require("./Customer");
const Schema = Mongoose.Schema;
const { handleError } = require("../../../error.js");

const OrderItemSchema = new Schema({
  description: String,
  price: Number,
  quantity: Number,
  notes: String,
});

const OrderSchema = new Schema({
  dateCreated: { type: Date, default: Date.now },
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
Order.on('index',(arg1)=>{
  console.log("text here", arg1)

})


async function createOrder(orderData) {
  let o = new Order(orderData);
  let result = await o.save().catch((e) => {
    throw new Mongoose.Error();
  });
  return result._id.toString();
}

// Returns a promise
function getOrder(orderId) {
  console.log(orderId)
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

//FIXME: these probably doesn't work
function updateOrder(orderId, changes) {
  return Order.findByIdAndUpdate(orderId, changes).catch(handleError);
}

// Returns a promise
function deleteOrder(orderId) {
  return Order.remove(orderId).catch(handleError);
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
