const dbTest = require("../testdb");

let database = require("../testdb");



describe("Query Tests", () => {
  let db;

  beforeAll(async () => {
    db = await database();
  });

  afterAll(async () => {
    await db.close();
    db = null;
  });

  describe("Orders", () => {
    describe("getOrder", () => {
      let testOrder = {
        customerName: "Sean",
        email: "Spkelly18@gmail.com",
        dateCreated: new Date(),
        dateModified: new Date(),
        oderDate: new Date(),
        isTaxed: false,
        deliveryCharge: 12,
        address: "1201 Balsam AVe.",
        items: [
          {
            name: "Display Cake",
            quantity: 1,
            options: { servingSize: 20 },
            price: 2.5,
            flavor: "Lemon",
            topping: "Buttercream"
          },
          {
            name: "Cake Pops",
            quantity: 15,
            options: {  },
            price: 2.5,
            flavor: "Vanilla",
            topping: "Chocolate"
          }
        ]
      };
      let idToTest;
      let collection;

      beforeAll(async () => {
        // calling the db insert on testOrder directly, modifies it to have an id
        let theOrder = testOrder;
        collection = db._dbInstance.db().collection("orders");
        let dbResponse = await collection.insertOne(theOrder);
        delete testOrder._id;
        idToTest = dbResponse.insertedId;
      });
      afterAll(async () => {
        await collection.delete({ _id: idToTest });
      });
      it("should return an object of requested order", async () => {
        let testResponse = await db.Orders.getOrder(idToTest);
        // delete testResponse._id;
        expect(testResponse).toMatchObject(testOrder);
      });
      it("_id field should be a String", async() => {
        let testResponse = await db.Orders.getOrder(idToTest);
        expect(typeof(testResponse._id)).toBe('string')
      });
      it("error handling", () => {});
    });
    describe("queryOrders", () => {
      it("should return array of objects that match the given search term", async() => {
        let testQuery = "Sean";
        let response = await db.Orders.queryOrders(testQuery);
        expect(Array.isArray(response)).toBe(true);
      });

      it("each returned object should contain an object with a string type", async() => {
        let testQuery = "Sean";
        let response = await db.Orders.queryOrders(testQuery);

        response.forEach((order)=>{
          expect(typeof order._id).toBe('string')
        })
      });
    });
    describe("removeOrder", () => {});
    describe("updateOrder", () => {
      let testOrder = {
        customer:{
          name: "Sean",
          email: "Spkelly18@gmail.com",
          oderDate: new Date(),
          address: "1201 Balsam AVe.",          
        },
        dateCreated: new Date(),
        dateModified: new Date(),
        isTaxed: false,
        deliveryCharge: 12,
        items: [
          {
            name: "Display Cake",
            quantity: 1,
            options: { servingSize: 20 },
            price: 2.5,
            flavor: "test",
            topping: "Test"
          },
          {
            name: "Cake Pops",
            quantity: 15,
            options: { },
            price: 2.5,
            flavor: "test",
            topping: "Test"
          }
        ]
      };
      let idToTest;
      let collection;

      beforeAll(async () => {
        // calling the db insert on testOrder directly, modifies it to have an id
        let theOrder = testOrder;
        collection = db._dbInstance.db().collection("orders");
        let dbResponse = await collection.insertOne(theOrder);
        delete testOrder._id;
        idToTest = dbResponse.insertedId;
      });
      afterAll(async () => {
        // await collection.delete({ _id: idToTest });
      });
      it('should return the updated id of the updated order',async()=>{
      let response = db.Orders.updateOrder(idToTest,{customer:{name:"Ariana",email: "blah"}})
    });
    });
    describe("addOrder", () => {});
  });
  describe("Menu", () => {
    describe("getProduct", () => {});
    describe("getAllProducts", () => {});
    describe("updateProduct", () => {});
    describe("getCategories", () => {});
    describe("getProductsByCategory", () => {});
    describe("getToppings", () => {});
    describe("addTopping", () => {});
    describe("removeTopping", () => {});
    describe("getFlavors", () => {});
    describe("addFlavor", () => {});
    describe("removeFlavor", () => {});
  });
});

// run();
