function mapIdToString(array) {
  return array.map(item => {
    return { ...item, _id: item._id.toString() };
  });
}
module.exports = function(dbInstance) {
  let orderCollection = dbInstance.db().collection("orders");
  const ObjectID = require("mongodb").ObjectID;

  function queryOrders(query) {

    return new Promise((resolve, reject) => {
      orderCollection.find(
        { $text: { $search: query } },
        async (err, result) => {
          if (err) reject(err);

          resolve(mapIdToString(await result.toArray()));
        }
      );
    });
  }

  function getUnpaid(){
    console.log('fetching unpaid in db');
  }

  function addOrder(order) {
    return new Promise((resolve, reject)=>{
      orderCollection.insertOne(order, (err,response)=>{
        resolve(response);
      });
    })
  }

  // Returns oldest 5 orders that have not been paid
  function getUnpaid() {

    return new Promise((resolve,reject)=>{
      orderCollection
      .aggregate([
        { $match: { "customer.hasPaid": false } },
        {
          $project: {
            _id: { $toString: "$_id" },
            "customer.name": 1,
            "customer.date":1,
            dateCreated: 1,
            orderDate: 1
          }
        }
      ])
      .limit(5)
      .sort({ dateCreated: 1 })
      .toArray((err, doc) => {
        console.log(doc);
        if (err) console.error("Error has occured", err);
        resolve(doc)
      });
    })

  }

  function removeOrder(orderId) {
    
  }

  function updateOrder(id, modifications) {
    modifications.orders = modifications.items;
    delete modifications.items;
    delete modifications._id;
    return new Promise((resolve, reject) => {
      orderCollection.updateOne(
        { _id: ObjectID(id) },
        {$set:modifications},
        async (err, response) => {
          if (err) console.log("ERROR: ", err);
          resolve(response.result);
        }
      );
    });
  }

  function getOrder(id) {

    return new Promise((resolve, reject) => {
      orderCollection.findOne({ _id: ObjectID(id) }, (err, doc) => {
        if (err) reject(err);
        doc._id = doc._id.toString();
        resolve(doc);
      });
    });
  }

  return {
    queryOrders,
    getUnpaid,
    addOrder,
    removeOrder,
    getOrder,
    updateOrder
  };
};
