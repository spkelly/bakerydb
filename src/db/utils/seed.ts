// Seed database with test data
// import database from "../index";
const database = require("../index");

const MAX_ORDERS = 20;
const MAX_ORDER_ITEMS = 5;
const MAX_ORDER_QTY = 50;

const customerOptions = [
  {
    name: "Sean Kelly",
    address: "1201 Balsam Avenue Boulder, Co 80304",
    phone: 3038170791,
    email: "spkelly18@gmail.com"
  },
  {
    name: "Billy Zane",
    address: "1201 Balsam Avenue Boulder, Co 80304",
    phone: 3038170791,
    email: "spkelly18@gmail.com"
  },
  {
    name: "Jamie",
    address: "1201 Balsam Avenue Boulder, Co 80304",
    phone: 3038170791,
    email: "spkelly18@gmail.com"
  },
  {
    name: "Tyrion",
    address: "1201 Balsam Avenue Boulder, Co 80304",
    phone: 3038170791,
    email: "spkelly18@gmail.com"
  },
  {
    name: "Mike Tyson",
    address: "1201 Balsam Avenue Boulder, Co 80304",
    phone: 3038170791,
    email: "spkelly18@gmail.com"
  },
  {
    name: "Tony Schaloub",
    address: "1201 Balsam Avenue Boulder, Co 80304",
    phone: 3038170791,
    email: "spkelly18@gmail.com"
  },
  {
    name: "Tom Cruise",
    address: "1201 Balsam Avenue Boulder, Co 80304",
    phone: 3038170791,
    email: "spkelly18@gmail.com"
  },
  {
    name: "Charles Schwab",
    address: "1201 Balsam Avenue Boulder, Co 80304",
    phone: 3038170791,
    email: "spkelly18@gmail.com"
  },
  {
    name: "Theodore Roosevelt",
    address: "1201 Balsam Avenue Boulder, Co 80304",
    phone: 3038170791,
    email: "spkelly18@gmail.com"
  },
  {
    name: "Tony Potestio",
    address: "1201 Balsam Avenue Boulder, Co 80304",
    phone: 3038170791,
    email: "spkelly18@gmail.com"
  },
  {
    name: "Henry Hoffman",
    address: "1201 Balsam Avenue Boulder, Co 80304",
    phone: 3038170791,
    email: "spkelly18@gmail.com"
  },
  {
    name: "Ariana Brunner",
    address: "1201 Balsam Avenue Boulder, Co 80304",
    phone: 3038170791,
    email: "spkelly18@gmail.com"
  },
  {
    name: "Nicholas Cage",
    address: "123 fake street",
    phone: 5558675309,
    email: "nick@enterthecage.com"
  },
  {
    name: "George Washington",
    address: "1600 Pennsylvania Ave",
    phone: 5558675395,
    email: "potus@whitehous.gov"
  },
  {
    name: "Alexander Hamilton",
    address: "1600 Pennsylvania Ave",
    phone: 5558675334,
    email: "treasurer@whitehous.gov"
  },
  {
    name: "Abraham Lincoln",
    address: "1201 Balsam Avenue Boulder, Co 80304",
    phone: 3038170791,
    email: "spkelly18@gmail.com"
  }
];

const menuOptions = [
  {
    name: "Cake Pops",
    price: 1.5
  },
  {
    name: "Mini Cheesecakes",
    price: 1.75
  },
  {
    name: "Cake",
    price: 50
  },
  {
    name: "Cookies",
    price: 1.0
  },
  {
    name: "Petit Fours",
    price: 3.5
  },
  {
    name: "Truffles",
    price: 0.95
  }
];

// returns a whole number between 0 and the argument max
function getRandomNumber(max, min=0) {
  return Math.floor(min + Math.random() * max);
}

async function run() {
  const { orderModel, connection } = await database.setup();


  async function seedDatabase(num) {
    let acc = [];
    let index = 0;
    let randomCustomer;
    let orderAmount;
    let orders;

    return new Promise(resolve => {
      while (index < num) {
        randomCustomer =
          customerOptions[getRandomNumber(customerOptions.length)];
        orderAmount = getRandomNumber(MAX_ORDER_ITEMS, 1);
        orders = generateOrderItems(orderAmount);

        // console.log(order);
        acc.push({
          customer: randomCustomer,
          isTaxed: true,
          deliveryCharge: 12,
          orders: orders,
          orderDate: new Date(),
          dateCreated: new Date()
        });
        index++;
      }
      orderModel.insertMany(acc).then(() => {
        resolve();
      });
    });
  }
  
  function generateOrderItems(itemAmount) {
    let acc = [];
    let randomItem;
    for (let i = 0; i < itemAmount; i++) {
      randomItem = menuOptions[getRandomNumber(menuOptions.length)];
      acc.push({
        name: randomItem.name,
        price: randomItem.price,
        quantity:
          randomItem.name == "Cake" ? 1 : getRandomNumber(MAX_ORDER_QTY,1),
        notes: ""
      });
    }
    return acc;
  }

  // await connection.dropDatabase();
  await seedDatabase(MAX_ORDERS)
  database.disconnect();
}

run();
