const database = require("../testdb");
let categoryIds;
function createItemsForCategory(category) {
  return [
    {
      name: "Simple Cake Pops",
      flavors: ["chocolate", "white", "yellow", "lemon", "red"],
      toppings: ["sprinkles"],
      price: 2.0,
      modifiers: [],
      categoryId: category
    },
    {
      name: "Complex Cake Pops",
      flavors: ["chocolate", "white", "yellow", "lemon", "red"],
      toppings: ["sprinkles"],
      price: 2.5,
      modifiers: [],
      categoryId: category
    },
    {
      name: "Mini Cheesecakes",
      flavors: [],
      toppings: [],
      modifiers: [],
      price: 2,
      categoryId: category
    }
  ];
}

let makeCakes = categoryId => {
  return [
    {
      name: "Display Cake",
      flavors: [
        "White",
        "Marble",
        "Carrot",
        "Apple",
        "Pumpkin",
        "Lemon",
        "Vanilla",
        "Chocolate"
      ],
      toppings: [
        "Buttercream Icing",
        "Chocolate Buttercream",
        "Whipped Cream",
        "Peanut Butter"
      ],
      price: 2.5,
      modifiers: [{ name: "", basePrice: 2.5, modificationAmount: 0 }],
      categoryId: categoryId
    },
    {
      name: "Sheet Cake",
      flavors: ["Lemon", "Vanilla", "Chocolate"],
      toppings: ["Buttercream", "Chocolate"],
      price: 2.5,
      modifiers: [{ name: "", basePrice: 2.5, modificationAmount: 0 }],
      categoryId: categoryId
    }
  ];
};

database()
.then(async db => {
  let productCollection = db._dbInstance.db().collection("products");
  let categoryCollection = db._dbInstance.db().collection("categories");
  let categoryDocs = [
    // maps category list into documents to be stored in database
    "Cakes",
    "Bite Sized",
    "Cookies",
    "Chocolates",
    "Everyday Desserts"
  ].map(name => {
    return { name };
  });
  console.log("removing old data...");
  await categoryCollection.deleteMany({});
  await productCollection.deleteMany({});
  console.log("seeding database...");
  let storedCategories = await categoryCollection.insertMany(categoryDocs);
  let testProducts1 = createItemsForCategory(
    db.toObjectID(storedCategories.insertedIds["1"])
  );
  await productCollection.insertMany(testProducts1, (err, result) => {
    if (err) console.error(err);
  });

  let testProducts2 = makeCakes(
    db.toObjectID(storedCategories.insertedIds["0"])
  );

  await productCollection.insertMany(testProducts2, (err, result) => {
    if (err) console.error(err);
  });
  console.log(
    "\nComplete: Inserted",
    categoryDocs.length,
    "categories and ",
    testProducts1.length + testProducts2.length,
    "products "
  );
  db.close();
})
.catch(e => {
  console.log(e);
});
