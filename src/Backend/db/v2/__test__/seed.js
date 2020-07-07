const OrderModel = require("../models/Order")._model;
const ProductModel = require("../models/Product");
const {
  getRand,
  getRandDate,
  getRandPrice,
  accum,
} = require("../../../../Shared/helpers");

const ORDER_SEED_COUNT = 10;
const PRODUCT_SEED_COUNT = 25;
const NAMES = ["Sean Kelly", "Colonel Sanders", "Nick Cage"];
const ITEM_NAMES = ["Cake pops", "Brownies"];
const NAMES_LENGTH = NAMES.length;
const CURRENT_DATE = new Date();
const END_DATE = new Date(CURRENT_DATE.getTime() + 2592000000); // 1 month in the future
// const OLD_DATE = new Date(CURRENT_DATE.getTime() - 2592000000); // 1 month in the Past
const ORDER_DEFAULTS = {
  hasPaid: false,
  datePaid: null,
  taxRate: 7.75,
  hasTip: true,
  hasTax: true,
  invoiceRef: null,
  notes: "a fake note",
};

function randomItemName() {
  return ITEM_NAMES[getRand(ITEM_NAMES.length)];
}

function generateOrderItem() {
  return {
    itemName: randomItemName(),
    quantity: getRand(15, 1),
    price: getRandPrice(),
    notes: "fake note\n fake note other line",
  };
}

// Generates a fake Order object
function generateOrder() {
  return Object.assign({}, ORDER_DEFAULTS, {
    customer: {
      name: NAMES[getRand(NAMES_LENGTH)],
      address: "213 fake street, Anytown USA",
      phone: "555-867-5309",
      email: "fake@fakeEmail.com",
    },
    orderItems: accum(getRand(5, 1), generateOrderItem),
    orderDate: getRandDate(CURRENT_DATE, END_DATE),
    tipAmount: getRandPrice(),
    deliveryCharge: getRandPrice(),
  });
}

function generateDetailList() {
  return {
    detailName: "AttributeList",
    detailItems: ["test 1", "test 2"],
  };
}

function generateProduct() {
  return {
    name: randomItemName(),
    basePrice: getRandPrice(),
    details: accum(2, generateDetailList),
    modifier: null,
  };
}

module.exports = {
  testOrders: accum(ORDER_SEED_COUNT, generateOrder),
  testProducts: accum(PRODUCT_SEED_COUNT, generateProduct),
  seedOrders(orders){
    OrderModel.insertMany(orders);
  },
  seedProducts(){
    return ProductModel.insertMany(this.testProducts);
  },
};
