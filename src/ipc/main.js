const {ipcMain} = require('electron');
const ipcChannels = require("../constants");
const logAttr = require('../utils/logger').logAttr;

module.exports = {
  setupEventListeners(testDB, db){
    ipcMain.on(ipcChannels.GET_ORDER, async (event, id) => {
      logAttr(id);
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
      let idRef = orderToUpdate._id;
      let otherOrder = await testDB.Orders.updateOrder(
        orderToUpdate._id,
        orderToUpdate
      );
      event.sender.send(ipcChannels.UPDATE_ORDER_SUCCESS,idRef);
      // console.log(otherOrder)
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