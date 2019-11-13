const database = require("../testdb");
let categoryIds;
function createItemsForCategory(category) {
  return [
    {
      name: "Simple Cake Pops",
      flavors: [],
      toppings: [],
      price: 1.75,
      modifiers: [],
      categoryId: category
    },
    {
      name: "Complex Cake Pops",
      flavors: [],
      toppings: [],
      price: 1.75,
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

database()
  .then(async db => {
    let productCollection = db._dbInstance.db().collection("products");
    let categoryCollection = db._dbInstance.db().collection("categories");
    let categoryDocs = [  // maps category list into documents to be stored in database
      "Cakes",
      "Bite Sized",
      "Cookies",
      "Chocolates",
      "Everyday Desserts"
    ].map(name => {
      return { name };
    });
    console.log('removing old data...')
    await categoryCollection.deleteMany({});
    await productCollection.deleteMany({});
    console.log('seeding database...')
    let storedCategories = await categoryCollection.insertMany(categoryDocs);
    let testProducts = createItemsForCategory(
      db.toObjectID(storedCategories.insertedIds['0'])
    );
    await productCollection.insertMany(testProducts, (err, result) => {
      if (err) console.error(err);
    });
    console.log("\nComplete: Inserted", categoryDocs.length, 'categories and', testProducts.length, 'products')
    db.close();
  })
  .catch(e => {
    console.log(e);
  });
