// let db = require("../db.js");
let Database = require("../db.js");
const Counter = require("../models/Sequence");
const Order = require("../models/Order");
const Invoice = require("../models/Invoices");
const Product = require("../models/Product.js");
let { testOrders, testProducts, seedOrders } = require("./seed");
const mongoose = require("mongoose");
const { getOrder } = require("../models/Order");
const { createInvoice } = require("../models/Invoices.js");


console.log(Product);
const TEST_ORDER = {
  customer: {
    name: "Sean",
    address: "210 fake street",
    phone: "555-555-3492",
  },
};

const TEST_ORDER_NO_NAME = {
  customer: {
    address: "210 fake street",
    phone: "555-555-3492",
  },
};
var idToTest;

describe("Database V2", () => {
  let db;
  beforeAll(async () => {
    db = new Database();
    await db.init();
    // await db.dropAll();
    await seedOrders(testOrders);
  });

  afterAll(async () => {
    await db.dropAll();
    await db.close();
  });

  describe("Order", () => {
    let testId;
    // TODO: Finish these tests
    describe("createOrder", () => {
      it("should save an order to the database and return id", async () => {
        let testDbResult = await Order.createOrder(TEST_ORDER);
        expect(testDbResult).toEqual(expect.any(String));
        testId = testDbResult;
      });
      // FIXME:
      // it("should require a customer name in order to be saved", async () => {

      //   expect(await Order.createOrder(TEST_ORDER_NO_NAME)).toThrow(mongoose.Error)
      // });
      it("should create an empty invoice reference on creation", async () => {
        let order = await Order._model.findById(testId);
        expect(order.invoiceRef).toBe(null);
      });
    });
    describe("getOrder", () => {
      it("should fetch an order via id", async () => {
        let test = await Order.getOrder(testId);
        expect(Object.keys(test)).toEqual(
          expect.arrayContaining(["_id", "customer", "orderItems", "createdAt"])
        );
      });
    });

    describe("getUnpaid", () => {
      it("should return an array", async () => {
        let test = await Order.getUnpaid();
        expect(Array.isArray(test)).toBe(true);
      });
      it("should return each order id as a string", async () => {
        let test = await Order.getUnpaid();
        test.forEach((item) => {
          expect(typeof item._id).toBe("string");
        });
      });
      it("each item in the array should have hasUnpaid set to false", async () => {
        let test = await Order.getUnpaid();
        test.forEach((order) => expect(order.hasPaid).toBe(false));
      });
    });
    describe("queryOrders", () => {
      beforeAll(async () => {
        // db gets torn down after tests, this will ensure that text indexes are created before queries are made
        await Order._model.ensureIndexes();
      });
      it("should return an array of orders for a given query", async () => {
        let test = await Order.queryOrders("Sean");
        expect(Array.isArray(test)).toBe(true);
      });
      it("each item of array should have a customer name", async () => {
        let test = await Order.queryOrders("Sean");
        test.forEach((order) => expect(order).toHaveProperty("customer.name"));
      });
      it("each item of array should contain an _id field as a string", async () => {
        let test = await Order.queryOrders("Sean");
        test.forEach((item) => expect(typeof item._id).toBe("string"));
      });
      it("each item of array should have a order date", async () => {
        let test = await Order.queryOrders("Sean");
        test.forEach((order) => expect(order).toHaveProperty("orderDate"));
      });
      it("each item of array should have a hasPaid flag", async () => {
        let test = await Order.queryOrders("Sean");
        test.forEach((order) => expect(order).toHaveProperty("hasPaid"));
      });
    });
    describe("updateOrder", () => {
      it("should update any changes to the order", async () => {
        let updates = { hasPaid: true, paymentType: "Venmo" };
        let updatedOrder = await Order.updateOrder(testId, updates);
        expect(updatedOrder).toHaveProperty("paymentType", "Venmo");
        expect(updatedOrder).toHaveProperty("hasPaid", true);
      });
      it("should set the updatedAt field to current date", async () => {
        let initialOrder = await Order.getOrder(testId);
        let date = initialOrder.updatedAt;
        let updated = await Order.updateOrder(testId, { hasPaid: false });
        expect(date).not.toBe(updated.updatedAt);
      });
      it("should handle updates to the customer subDocument", async () => {
        let updates = { customer: { name: "Bill" } };
        let updatedOrder = await Order.updateOrder(testId, updates);
        expect(updatedOrder).toHaveProperty("customer.name", "Bill");
        expect(updatedOrder).toHaveProperty("customer.address");
      });
      it("should handle updates to orderItem array", async () => {
        let orderAdditions = [
          { description: "Test Item", quantity: 12, price: 1.5 },
        ];

        let updatedOrder = await Order.updateOrder(testId, {
          orderItems: orderAdditions,
        });
        expect(updatedOrder.orderItems.length).toBe(1);

        orderAdditions.push({
          description: "Test Item",
          quantity: 12,
          price: 1.5,
        });

        updatedOrder = await Order.updateOrder(testId, {
          orderItems: orderAdditions,
        });

        expect(updatedOrder.orderItems.length).toBe(2);
        orderAdditions.pop();

        updatedOrder = await Order.updateOrder(testId, {
          orderItems: orderAdditions,
        });
        expect(updatedOrder.orderItems.length).toBe(1);
      });
    });
    describe("deleteOrder", () => {
      it("should delete given order from the datebase", async () => {
        await Order.deleteOrder(testId);
        let doesItExist = await Order._model.exists({ _id: testId });
        expect(doesItExist).toBe(false);
      });
    });
  });

  describe("Counter", () => {
    describe("createCounter", () => {
      it("should save a new counter with a given name", async () => {
        let counterName = "counter1";
        let c = await Counter.createCounter(counterName);
      });
    });

    describe("checkIfCounterExists", () => {
      it("should return true if the counter has already been saved", async () => {
        let counterCheck = await Counter.checkifCounterExists("counter1");
        expect(counterCheck).toBe(true);
      });
      it("should return false if the counter has not been saved", async () => {
        let counterCheck = await Counter.checkifCounterExists("counterNotInDB");
        expect(counterCheck).toBe(false);
      });
    });

    describe("getValue", () => {
      it("should return the current sequence number and name", async () => {
        let c = await Counter.getValue("counter1");
        expect(c).toHaveProperty("counterName");
        expect(c).toHaveProperty("seq");
      });
    });

    describe("getValueAndUpdate", () => {
      it("Should create a counter if one has not already been created", async () => {
        let c = await Counter.getValueAndUpdate("fakeCounter");
        expect(c).toEqual({ counterName: "fakeCounter", seq: 1 });
      });

      it("Should return the current sequence number and then update it", async () => {
        let counterName = "testCounter";
        let docBeforeUpdate = await Counter.getValueAndUpdate(counterName);
        let docAfterUpdate = await Counter.getValue(counterName);

        expect(docBeforeUpdate.seq).toEqual(1);
        expect(docAfterUpdate.seq).toEqual(2);
      });
    });
  });
  describe("Product", () => {
    describe("createProduct", () => {
      it("should add a product to the database", async ()=>{
        let data = {}
        let productId = await Product.createProduct(data);
        expect(Product._model.exists({_id:productId}))
      });
      it("should return an _id field as a string", async ()=>{
        let data = {}
        let productId = await Product.createProduct(data);
        expect(typeof(productId)).toBe("string");
      });
    });
    describe("getProductsByCategory", () => {
      it.todo("should retrieve an Array of products via a given category");
      it.todo("each item in array should have an _id field as a string");
    });
    describe("getProduct", () => {
      it.todo("should retrieve a product from the database via id");
    });
    describe("updateProduct", () => {
      it.todo("should update the given product with changes");
    });
    describe("deleteProduct", () => {
      it.todo("should remove the product from the database");
    });
  });
  describe("Invoice", () => {
    let testOrder, testId, data, testInvoice;

    beforeAll(async ()=>{
      testOrder = await Order._model.findOne({});
      testId = testOrder._id.toString();
    });


    describe("createInvoice", () => {
      it("should create an invoice in the Invoices collection",async ()=>{
        let result = await Invoice.createInvoice(testId, data);
        expect(await Invoice._model.exists({_id:result})).toBe(true);
      });
      it("should return the invoice Id as a string",async ()=>{
        let result = await Invoice.createInvoice(testId, data);
        expect(typeof(result)).toBe("string");
      });
      it("should add its id to the invoice reference in the order collection",async ()=>{
        let result = await Invoice.createInvoice(testId, data);
        testInvoice = result;
        let order = await Order._model.findById(testId);
        expect(order.invoiceRef.toString()).toBe(result);
      });
      it.todo("Should have a properly incrementing invoiceNumber")
      it.todo("Should return the invoiceNumber in the proper format")
    });
    describe("getInvoice", () => {
      it("should retrieve invoice data via id",async ()=>{
        let result = await Invoice.getInvoice(testInvoice);
        expect(result).toHaveProperty("invoiceNumber");
        expect(result).toHaveProperty("revisions");
        expect(result).toHaveProperty("_id");
        
      });
      it.todo("Should return the invoiceNumber in the proper format")
    });
    describe("addRevision", () => {
      it("should add excel data to the revisions array",async ()=>{
        let data = {}
        let result = await Invoice.addRevision(testInvoice, data);
        expect(result.revisions.length).toEqual(2);
      });
    });
    describe("getRevisions", () => {});
    describe("createInvoice", () => {});
  });
});
