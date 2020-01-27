const { ipcMain } = require("electron");
const ipcChannels = require("../../Shared/constants");
const logAttr = require("../utils/logger").logAttr;

module.exports = {
  setupEventListeners(testDB, db, appInfo) {
    ipcMain.on(ipcChannels.GET_ORDER, async (event, id) => {
      logAttr(id);
      let order = await testDB.Orders.getOrder(id);
      event.sender.send(ipcChannels.GET_ORDER_SUCCESS, order);
    });

    ipcMain.on(ipcChannels.ADD_ORDER, async (event, order) => {
      
      let testOrder = await testDB.Orders.addOrder(order).catch(e => {
        console.log(e);
      });
      event.sender.send(
        ipcChannels.ADD_ORDER_SUCCESS,
        testOrder.insertedId.toString()
      );
    });

    ipcMain.on(ipcChannels.UPDATE_ORDER, async (event, orderToUpdate) => {
      let idRef = orderToUpdate._id;
      let otherOrder = await testDB.Orders.updateOrder(
        orderToUpdate._id,
        orderToUpdate
      );
      event.sender.send(ipcChannels.UPDATE_ORDER_SUCCESS, idRef);
    });

    ipcMain.on(ipcChannels.QUERY_ORDERS, async (event, term) => {

      console.log(db);
      let resp = await db.queryOrders(term);
      event.sender.send(ipcChannels.QUERY_ORDERS_SUCCESS, resp);
    });
    ipcMain.on(ipcChannels.EXPORT_DB, async (event, args) => {
      console.log("exporting database");
    });
    ipcMain.on(ipcChannels.IMPORT_ORDERS, async (event, args) => {
      console.log("importing orders");
    });

    ipcMain.on(ipcChannels.GET_MENU, async event => {});
    ipcMain.on(ipcChannels.GET_CATEGORIES, async event => {
      let dbResponse = await testDB.Menu.getCategories();
      event.sender.send(ipcChannels.GET_CATEGORIES_SUCCESS, dbResponse);
    });
    ipcMain.on(ipcChannels.GET_MENU, async event => {
      let categories = await testDB.Menu.getCategories();
      let products = await testDB.Menu.getAllProducts();
      event.sender.send(ipcChannels.GET_MENU_SUCCESS, { categories, products });
    });
    ipcMain.on(ipcChannels.GET_PRODUCTS_BY_CAT, async (event,id) => {
      let products = await testDB.Menu.getProductsByCategory(id);
      event.sender.send(ipcChannels.GET_PRODUCTS_BY_CAT_SUCCESS, products);
    });
    ipcMain.on(ipcChannels.GET_ALL_PRODUCTS, async (event) => {
      let products = await testDB.Menu.getAllProducts();
      event.sender.send(ipcChannels.GET_ALL_PRODUCTS_SUCCESS, products);
    });

    ipcMain.on(ipcChannels.GET_PRODUCT, async (event,id) =>{
      let product = await testDB.Menu.getProduct(id);
      event.sender.send(ipcChannels.GET_PRODUCT_SUCCESS,product);
    })
    ipcMain.on(ipcChannels.ADD_FLAVOR, async event => {});
    ipcMain.on(ipcChannels.REMOVE_FLAVOR, async event => {});
    ipcMain.on(ipcChannels.ADD_TOPPING, async event => {});
    ipcMain.on(ipcChannels.REMOVE_TOPPING, async event => {});
    ipcMain.on(ipcChannels.GET_VERSION, async event=>{});


    ipcMain.on(ipcChannels.CHECK_FOR_UPDATE, async event=>{
      console.log('checking for updates')
      appInfo.updater.autoUpdater.checkForUpdates();
    });

    ipcMain.on(ipcChannels.DOWNLOAD_UPDATE, async event=>{
      appInfo.updater.autoUpdater.downloadUpdate();
      console.log('received request to download update');

    });

    ipcMain.on(ipcChannels.CONFIRM_UPDATE, async event=>{
      // handle install here 
      appInfo.updater.autoUpdater.quitAndInstall(true,true);
    })

    ipcMain.on(ipcChannels.GET_VERSION, event => {
      console.log(' I recieved a')
      event.sender.send(ipcChannels.GET_VERSION_RESPONSE, appInfo.currentVersion);
    })

    ipcMain.on(ipcChannels.GET_DATABASE_STATUS, event =>{
        event.sender.send(ipcChannels.GET_DATABASE_STATUS_RESPONSE, testDB != undefined);
    })
  }
};
