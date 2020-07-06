class MongoDBCollection {
  constructor(databaseInstance, collectionName) {
    let db = databaseInstance.db();
    this.collection = db.collection(collectionName);
  }

  _insert(item) {
    return this.collection.insertOne(item);
  }

  _get(query) {
    return this.collection.findOne(query);
  }

  _delete() {}

  _getAll() {}

  _drop() {
    return this.collection.drop();
  }
}

class Orders extends MongoDBCollection {
  constructor(databaseInstance) {
    super(databaseInstance, "orders");
  }

  async getFirstOrder() {
    return this._get({});
  }

  getOrder(order = {}) {}

  async addOrder(order) {
    // TODO: Validate Order
    await this._insert({
      hasPaid: order.hasPaid,
      isTaxed: order.isTaxed,
      tip: order.tip,
      orderItems: order.orderItems,
      customer: order.customer,
      taxRate: order.taxRate,
      isTaxed: order.isTaxed,
      paymentType: order.paymentType,
      deliveryCharge: order.deliveryCharge,
      notes: order.notes,
      dateCreated: Date.now(),
    });
  }
}

module.exports = {
  Orders,
};
