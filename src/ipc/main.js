const {ipcMain} = require('electron');
const ipcChannels = require("../constants");

module.exports = {
  setupEventListeners(testDB, db){
    ipcMain.on(ipcChannels.GET_ORDER, async (event, id) => {
      let order = await testDB.Orders.getOrder(id);
      event.sender.send(ipcChannels.GET_ORDER_SUCCESS, order);
    });
    
    ipcMain.on(ipcChannels.ADD_ORDER, async (event, order) => {
      let testOrder = new dbObject.orderModel(order);
      await testOrder.save().catch(e => {
        console.log(e);
      });
    
      event.sender.send(ipcChannels.ADD_ORDER_SUCCESS, testOrder._id.toString());
    });
    
    ipcMain.on(ipcChannels.UPDATE_ORDER, async (event, orderToUpdate) => {
      let order = await db.updateOrder(orderToUpdate);
      let otherOrder = await testDB.Orders.updateOrder(
        orderToUpdate._id,
        orderToUpdate
      );
      console.log(orderToUpdate);
      console.log(order);
    });
    
    ipcMain.on(ipcChannels.QUERY_ORDERS, async (event, term) => {
      let resp = await db.queryOrders(term);
      console.log("the response completed", resp);
      event.sender.send(ipcChannels.QUERY_ORDERS_SUCCESS, resp);
    });
    ipcMain.on(ipcChannels.EXPORT_DB, async (event, args) => {
      console.log("exporting database");
    });
    ipcMain.on(ipcChannels.IMPORT_ORDERS, async (event, args) => {
      console.log("importing orders");
    });
  }
}