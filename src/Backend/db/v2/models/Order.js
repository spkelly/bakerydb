const Mongoose = require("mongoose");
const CustomerSchema = require("./Customer");
const Schema = Mongoose.Schema;

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

let Order = Mongoose.model("order", OrderSchema);

async function createOrder(orderData) {
  let o = new Order(orderData);
  let result = await o.save().catch((e) => {
    throw new Mongoose.Error();
  });
  return result._id.toString();
}

function getOrder(orderId) {
  return Order.findById(orderId);
}

function queryOrders(query) {
  return Order.find({ $text: { $search: query } });
}

function updateOrder(orderId, changes) {
  return Order.findByIdAndUpdate(orderId, changes);
}

function deleteOrder(orderId) {
  return Order.remove(orderId);
}

module.exports = {
  createOrder,
  getOrder,
  queryOrders,
  updateOrder,
  deleteOrder,
  _model: Order,
};
