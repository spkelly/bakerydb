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
        console.log(response);
        resolve(response);
      });
    })
  }

  function removeOrder(orderId) {}

  function updateOrder(id, modifications) {
    console.log("the id", id);
    modifications.orders = modifications.items;
    delete modifications.items;
    delete modifications._id;
    console.log("[ORDER]",modifications)
    return new Promise((resolve, reject) => {
      orderCollection.updateOne(
        { _id: ObjectID(id) },
       {$set:modifications} ,
        async (err, response) => {
          if (err) console.log("ERROR: ", err);
          console.log('here');
          resolve(response.result);
        }
      );
    });
  }

  function getOrder(id) {
    console.log(["variable type: "], typeof(id),'value: ', id);
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
