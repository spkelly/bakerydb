// let db = require("../db.js");
let Database = require("../db.js");
let Counter = require("../models/Sequence");
let Order = require("../models/Order");
let {testOrders,testProducts, seedOrders} = require("./seed");
const mongoose  = require("mongoose");


const TEST_ORDER = {
  customer:{
    name:"Sean",
    address: "210 fake street",
    phone: "555-555-3492"
  }
}

const TEST_ORDER_NO_NAME = {
  customer:{
    address: "210 fake street",
    phone: "555-555-3492"
  }
}
var idToTest;

describe("Database V2", () => {
  let db;
  beforeAll(async () => {
    db = new Database();
    await db.init();
    await seedOrders(testOrders);
  });

  afterAll(async () => {
    await db.dropAll();
    await db.close();
  });

  describe("Order", () => {
    // TODO: Finish these tests
    describe("createOrder", () => {
      let testId;

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
      it("should fetch an order via id", () => {});
    });
    describe("queryOrders", () => {
      it("should return an array of orders for a given query", () => {});
      it("each item of array should have a customer name", () => {});
      it("each item of array should have a order date", () => {});
      it("each item of array should have a hasPaid flag", () => {});
    });
    describe("updateOrder", () => {
      it("should update any changes to the order", () => {});
      it("should set the updatedAt field to current date", () => {});
    });
    describe("deleteOrder", () => {
      it("should delete given from the datebase", () => {});
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
