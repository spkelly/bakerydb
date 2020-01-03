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

  function addOrder(order) {
    return new Promise((resolve, reject)=>{
      orderCollection.insertOne(order, (err,response)=>{
        resolve(response);
      });
    })
  }

  // Returns oldest 5 orders that have not been paid
  function getUnpaid(){
    orderCollection.find({'hasPaid': flase}).toArray((err,doc)=>{
      if(err) console.error("Error has occured", err)
      console.log(doc);
    });
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
    addOrder,
    removeOrder,
    getOrder,
    updateOrder
  };
};
