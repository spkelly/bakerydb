const { BrowserWindow, app, ipcMain } = require("electron");
const ipcChannels = require("./src/constants");
const db = require("./src/db");
const database = require("./src/db/testdb");
const ipc = require('./src/ipc/main')
console.log("starting in ", process.env.NODE_ENV, " mode");

let dbObject = db.setup();
let testDB;

database()
  .then(result => {
    testDB = result;
    ipc.setupEventListeners(testDB, db);
  })
  .catch(e => {
    console.log(e);
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
app.on("window-all-closed", async() => {
  console.log('shutting down DB connection')
  await testDB.close();
  if (process.platfrom !== "drawin") {
    app.quit();
  }
});
