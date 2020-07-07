// let db = require("../db.js");
let Database = require("../db.js");
let Counter = require("../models/Sequence");
let Order = require("../models/Order");
let { testOrders, testProducts, seedOrders } = require("./seed");
const mongoose = require("mongoose");

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
      it("should fetch an order via id", async() => {
        let test = await Order.getOrder(testId);
        expect(Object.keys(test)).toEqual(expect.arrayContaining(['_id', 'customer', 'orderItems','dateCreated']))
      });
    });

    describe("getUnpaid", () => {
      it("should return an array", async () => {
        let test = await Order.getUnpaid();
        expect(Array.isArray(test)).toBe(true);

      });
      it("should return each order id as a string", async () => {

        let test = await Order.getUnpaid();

        test.forEach((item)=>{
          expect(typeof item._id).toBe("string");
        });
      });
      it("each item in the array should have hasUnpaid set to false", async() => {
          let test = await Order.getUnpaid();
          test.forEach((order)=> expect(order.hasPaid).toBe(false));
      });
    });
    describe("queryOrders", () => {
      beforeAll(async ()=>{
        // db gets torn down after tests, this will ensure that text indexes are created before queries are made
        await Order._model.ensureIndexes();
      })
      it("should return an array of orders for a given query", async () => {
        let test = await Order.queryOrders('Sean');
        expect(Array.isArray(test)).toBe(true);
      });
      it("each item of array should have a customer name",async () => {
        let test = await Order.queryOrders('Sean');
        test.forEach((order)=>expect(order).toHaveProperty('customer.name'))
      });
      it("each item of array should have a order date", async () => {
        let test = await Order.queryOrders('Sean');
        test.forEach((order)=>expect(order).toHaveProperty('orderDate'))
      });
      it("each item of array should have a hasPaid flag", async () => {
        let test = await Order.queryOrders('Sean');
        test.forEach((order)=>expect(order).toHaveProperty('hasPaid'))
      });
    });
    describe("updateOrder", () => {
      it("should update any changes to the order", async () => {
        expect("this is a place holder failing test").toBe("test not finished");
      });
      it("should set the updatedAt field to current date",async () => {
        expect("this is a place holder failing test").toBe("test not finished");
      });
    });
    describe("deleteOrder", () => {
      it("should delete given from the datebase",async () => {
        expect("this is a place holder failing test").toBe("test not finished");
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
});
