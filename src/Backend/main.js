const { BrowserWindow, app, ipcMain } = require("electron");
const db = require("./db");
const database = require("./db/testdb");
const ipc = require('./ipc/main');
const initUpdater = require('./updater');
const electronIsDev = require('electron-is-dev');
const Settings = require('./settings');

console.log('electron-is-dev: ', electronIsDev);
console.log('electron is packaged', app.isPackaged)
require("dotenv").config();
console.log("starting in ", process.env.NODE_ENV, " mode");
// TODO: change naming scheme of DB object
// let dbObject = db.setup();
let testDB;
let updater;
let appInfo = {
  currentVersion: app.getVersion()
}

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  database()
  .then(result => {
    testDB = result;
    appInfo.database = result;
    appInfo.updater = initUpdater(win.webContents);
    appInfo.webContents = win.webContents;
    ipc.setupEventListeners(testDB, db, appInfo);
  })
  .catch(e => {
    console.log(e);
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
app.on("window-all-closed", async() => {
  console.log('shutting down DB connection')
  await testDB.close();
  app.quit();
  if (process.platform !== "darwin") {
  }
});


