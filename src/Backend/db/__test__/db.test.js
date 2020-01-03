let database = require("../testdb");
const TEST_DB_URL =  "mongodb://localhost:27017/bakerydb_test";


let db;
let orderIds;

let timesRan = 0;
const DESIRED_ORDER = {
  _id: expect.any(String),
  customer:{
    name: 'Sean',
    tipAmount: 12,
    email: "spkelly18@gmail.com",
    address: "1201 Balsam Ave.",
    date: expect.any(Date),
    isTaxed: false,
    deliveryCharge: 12,
  },
  dateCreated: expect.any(Date),
  dateModified: expect.any(Date),
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
}

const TEST_ORDER = {
  customer:{
    name: 'Sean',
    email: "spkelly18@gmail.com",
    dateCreated: new Date(),
    dateModified: new Date(),
    date: new Date(),
    isTaxed: false,
    tipAmount: 12,
    deliveryCharge: 12,
    address: "1201 Balsam Ave.",
  },
  dateCreated: new Date(),
  dateModified: new Date(),
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

function initDB(db){

  return new Promise((resolve,reject)=>{
    let orderCollection = db._dbInstance.db().collection('orders');
    orderCollection.createIndex({"customer.name":"text"});
    orderCollection.insert(TEST_ORDER,(err,doc)=>{
      if(err){ reject(err)}
      resolve();
    })
  })

}


//returns an array of all order._ids 
function getOrderIds(db){
  let orderCollection = db._dbInstance.db().collection('orders');
  return new Promise((resolve,reject)=>{
    orderCollection.find({}).toArray((err, orderArray)=>{
      let ids = orderArray.map(order => order._id)
      resolve(ids);
    })
  })
  
}

function clearDB(db){
  db._dbInstance.db().dropDatabase();
}
beforeAll(async () => {
  db = await database(TEST_DB_URL);
  await initDB(db);
  await db._dbInstance.db().collection('Orders').createIndex({"customer.name":"text"})
  orderIds = await getOrderIds(db);
});


afterAll(async () => {
  clearDB(db);
  await db.close();
  db = null;
});

describe("Query Tests", () => {

  describe("Orders", () => {
    describe("getOrder", () => {
      it("should return an object of requested order", async () => {
          let [idToTest] = orderIds;
          let testResponse = await db.Orders.getOrder(idToTest);

         expect(testResponse).toMatchObject(DESIRED_ORDER)
      });
      it("_id field should be a String", async() => {
          let [idToTest] = orderIds;
          let testResponse = await db.Orders.getOrder(idToTest);
        expect(typeof(testResponse._id)).toBe('string')
      });
      it('should return numbers for deliveryCharge and tip amounts', async ()=>{
          let [idToTest] = orderIds;
          let testResponse = await db.Orders.getOrder(idToTest); 
          expect(typeof(testResponse.customer.deliveryCharge)).toBe('number');         
          expect(typeof(testResponse.customer.tipAmount)).toBe('number');         
      });
      it("error handling", () => {});
    });
    describe("queryOrders", () => {
      it("should return array of objects that match the given search term", async() => {
        let testQuery = "Sean";
        let response = await db.Orders.queryOrders(testQuery);
        expect(Array.isArray(response)).toBe(true);
      });

      it("each returned object should contain an _id field with a string type", async() => {
        let testQuery = "Sean";
        let response = await db.Orders.queryOrders(testQuery);

        response.forEach((order)=>{
          expect(typeof order._id).toBe('string')
        })
       });
    });
    describe("removeOrder", () => {});
    describe("updateOrder", () => {
      it('should apply given updates', async()=>{
        let [id] = orderIds;
        let changes = {
          customer:{
            deliveryCharge: 24
          }
        }
  
        let response = await db.Orders.updateOrder(id, changes);
        console.log(response);
        let testResponse = await db.Orders.getOrder(id); 
        console.log(testResponse);
      })


    })

    describe("addOrder", () => {});
  });
  describe("Menu", () => {
    describe("getProduct", () => {
      it('should return the queried product', ()=>{
           db.Menu.getProduct(0).then((data)=>{

           });
      });
    });
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

