const { BrowserWindow, app, ipcMain } = require("electron");
const ipcChannels = require("./src/constants");
const mongoose = require("mongoose");
console.log("starting in ", process.env.NODE_ENV, " mode");

var OrderItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  notes: String
});

var CustomerSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  phone: String
});

var OrderSchema = new mongoose.Schema({
  orderDate: Date,
  customer: CustomerSchema,
  dateCreated: Date,
  orders: [OrderItemSchema]
});

let conn = mongoose.createConnection("mongodb://localhost:27017/bakerydb_dev", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let OrderModel = conn.model("Order", OrderSchema);

ipcMain.on(ipcChannels.GET_ORDER, (event, args) => {
  console.log("getting order id");
});

ipcMain.on(ipcChannels.ADD_ORDER, async (event, order) => {
  let testOrder = new OrderModel(order);
  console.log("Adding order");
  let resp = await testOrder.save();
});
ipcMain.on(ipcChannels.QUERY_ORDERS, async (event, args) => {
  console.log("Searching orders");
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
