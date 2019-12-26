const mongodb = require("mongodb");
const DB_URL = "mongodb://localhost:27017/bakerydb_dev";
const MongoClient = mongodb.MongoClient;

let database;
let categoryCollection;
let productCollection;

function setupDB(db) {
  return new Promise((resolve, reject) => {
    db.connect(DB_URL, { useUnifiedTopology: true }, (err, database) => {
      if (err) reject(err);
      resolve(database);
    });
  }).catch(e => {
    console.log("ERROR: ", e);
  });
}

const BiteSized = [
  {
    name: "Mini Bundt Cake",
    price: 1.5,
    flavors: [
      "Lemon Poppyseed topped with a tangy Lemon glaze ",
      "Apple with a rich Caramel sauce",
      "Red Velvet with a Vanilla glaze",
      "Chocolate with a Chocolate Ganache",
      "Vanilla with Strawberry Sauce"
    ],
    toppings: []
  },
  {
    name: "Mini Cheesecakes",
    price: 1.75,
    flavors: [
      "Plain",
      "Pumpkin",
      "Key Lime",
      "Caramel Pecan",
      "Chocolate",
      "Cookies-N-Cream"
    ],
    toppings: ["Whipped Cream and Blueberries", "Lemon Curd"]
  },
  {
    name: "Mini Pies/Tarts",
    price: 1.25,
    flavors: [
      "Caramel Apple Cheese Tart",
      "Raspberry Custard",
      "Coconut Cream",
      "Banana Cream",
      "Salted Chocolate Cream",
      "Lemon Meringue",
      "Key Lime"
    ],
    toppings: []
  },
  {
    name: "Brownie Bites",
    price: 1.0,
    flavors: [
      "Mint",
      "Peanut Butter",
      "Rocky Road",
      "Caramel Macadamia Nut",
      "Chocolate Fudge",
      "Turtle"
    ],
    toppings: []
  },
  {
    name: "Bars",
    price: 1.0,
    flavors: ["Lemon", "Raspberry", "Chocolate and Pecan"],
    toppings: []
  },
  {
    name: "Small Cream Puffs",
    price: 0.5,
    flavors: [],
    toppings: []
  },
  {
    name: "Cordial Cups",
    price: 1.75,
    flavors: [
      "Milk chocolate cup w/ cherries",
      "Milk chocolate cup w/ sweet cream cheese",
      "White chocolate cup w/ orange candy",
      "White chocolate cup w/ mocha buttercream"
    ],
    toppings: [
      "buttercream",
      "candied pecans",
      "chocolate buttercream icing",
      "white sprinkles"
    ]
  },
  {
    name: "Petit Fours",
    price: 3.5,
    flavors: [
      "White cake w/ lemon filling",
      "Chocolate cake w/ raspberry filling"
    ],
    toppings: ["chocolate", "white chocolate"]
  },
  {
    name: "Truffles",
    price: 0.95,
    flavors: [
      "Milk chocolate",
      "Dark chocolate",
      "Milk chocolate infused with Bailey's Irish Cream Liqueur"
    ],
    toppings: []
  },
  {
    name: "Rum Balls",
    price: 0.95,
    flavors: [],
    toppings: ["White sprinkles", "Chocolate sprinkles"]
  },
  {
    name: "Chocolate Covered Strawberries",
    price: 1.25,
    flavors: [],
    toppings: []
  },
  {
    name: "Peanut Butter Bites",
    price: 0.95,
    flavors: [],
    toppings: []
  },
  {
    name: "French Macarons ",
    price: 1.0,
    flavors: ["Raspberry", "Lemon", "Mint", "Mocha"],
    toppings: []
  }
];

const cookies = [
  { name: "Mini - Iced", price: 1.0, flavors: [], toppings: [] },
  { name: "Regular - Iced", price: 1.75, flavors: [], toppings: [] },
  { name: "Unique- Iced", price: 2.0, flavors: [], toppings: [] },
  { name: "Simple", price: 0.75, flavors: [], toppings: [] }
];

const pies = [
  { name: "Bananna Cream", price: 24, flavors: [], toppings: [] },
  { name: "Coconut Cream", price: 24, flavors: [], toppings: [] },
  { name: "Chocolate Cream", price: 24, flavors: [], toppings: [] },
  { name: "Apple", price: 24, flavors: [], toppings: [] },
  { name: "Cherry", price: 24, flavors: [], toppings: [] },
  { name: "Lemon Meringue", price: 24, flavors: [], toppings: [] },
  { name: "Pecan", price: 24, flavors: [], toppings: [] },
  { name: "Pumpkin ", price: 24, flavors: [], toppings: [] },
  { name: "Strawberry", price: 24, flavors: [], toppings: [] }
];

const cakepops = [
  {
    name: "Simple",
    price: 2,
    flavors: ["Chocolate", "White", "Yellow", "Lemon", "Red Velvet"],
    toppings: []
  },
  {
    name: "Theme Decorated",
    price: 2.5,
    flavors: ["Chocolate", "White", "Yellow", "Lemon", "Red Velvet"],
    toppings: []
  }
];

const cupcakes = [
  {
    name: "Mini",
    price: 1.75,
    flavors: ["Chocolate", "Yellow", "Red Velvet", "Lemon", "White"],
    toppings: [
      "Pure White Buttercream",
      "Chocolate",
      "Mocha",
      "Lemon Buttercream",
      "Whipped Cream",
      "Chocolate Whipped Cream",
      "Cream Cheese"
    ]
  },
  {
    name: "Regular",
    price: 2,
    flavors: ["Chocolate", "Yellow", "Red Velvet", "Lemon", "White"],
    toppings: [
      "Pure White Buttercream",
      "Chocolate",
      "Mocha",
      "Lemon Buttercream",
      "Whipped Cream",
      "Chocolate Whipped Cream",
      "Cream Cheese"
    ]
  }
];

let menuCategories = [
  "Cakes",
  "Cupcakes",
  "Cake Pops",
  "Cookies",
  "Bite sized"
];

const cakes = [{ name: "Display Cake", price: 2.5, flavors: [
"White ",   
"Chocolate",
"German Chocolate",
"Yellow",
"Red Velvet",
"Marble",
"Lemon",
"Carrot",
"Banana",
"Apple",
"Pumpkin",
"Coconut",
"Butter Pecan"

], toppings: [
  "Raspberry",
  "Strawberry",
  "Lemon",
  "Cherry",
  "Coconut-Pecan",
  "Coconut Cream",
  "Chocolate Bavarian Cream",
  "Cream Cheese",
  "Buttercream Icing",
  "Chocolate Buttercream",
  "Mocha Buttercream",
  "Chocolate Ganache",
  "Whipped Cream",
  "Chocolate Whipped Cream",
  "Peanut Butter"
] }];

function addCategories(catArray) {
  return new Promise(async (resolve, reject) => {
    await catArray.forEach(category => {
      categoryCollection
        .insertOne({ name: category })
        .catch(e => console.log(e));
    });
    console.log(categoryCollection);
    resolve();
  });
}

function getCategoryId(category) {
  return new Promise((resolve, reject) => {
    categoryCollection.findOne({ name: category }, async (e, cat) => {
      resolve(cat._id);
    });
  });
}

function addItemsToCategory(categoryId, items) {
  let itemsWithId = items.map(item => {
    return {
      categoryId: categoryId,
      ...item
    };
  });
  console.log(itemsWithId);

  return new Promise((resolve, reject) => {
    productCollection.insertMany(itemsWithId, (err, response) => {
      console.log(response);
      resolve();
    });
  });
}

async function main() {
  database = await setupDB(MongoClient);
  categoryCollection = database.db().collection("categories");
  productCollection = database.db().collection("products");
  await categoryCollection.deleteMany({});
  await productCollection.deleteMany({});
  await addCategories(menuCategories);
  await addItemsToCategory(await getCategoryId(menuCategories[0]), cakes);
  await addItemsToCategory(await getCategoryId(menuCategories[1]), cupcakes);
  await addItemsToCategory(await getCategoryId(menuCategories[2]), cakepops);
  await addItemsToCategory(await getCategoryId(menuCategories[3]), cookies);
  await addItemsToCategory(await getCategoryId(menuCategories[4]), BiteSized);
  database.close();
}

main();
