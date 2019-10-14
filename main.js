const { BrowserWindow, app, ipcMain } = require("electron");
const ipcChannels = require("./src/constants");
const db = require("./src/db");
console.log("starting in ", process.env.NODE_ENV, " mode");

let dbObject = db.setup();

ipcMain.on(ipcChannels.GET_ORDER, async(event, id) => {
  let order = await db.findById(id);
  console.log(order);
  event.sender.send(ipcChannels.GET_ORDER_SUCCESS,order);
});

ipcMain.on(ipcChannels.ADD_ORDER, async (event, order) => {
  let testOrder = new dbObject.orderModel(order);
  testOrder.save().catch(e => {
    console.log(e);
  });
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

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  if (process.env.NODE_ENV == "development") {
    win.loadURL("http://localhost:3000");
    win.openDevTools();
    win.setSize(1100, 600);
  } else {
    win.loadFile("dist/index.html");
  }
}

app.on("ready", createWindow);
