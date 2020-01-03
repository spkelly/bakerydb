const { BrowserWindow, app, ipcMain } = require("electron");
const db = require("./db");
const database = require("./db/testdb");
const ipc = require('./ipc/main')
console.log("starting in ", process.env.NODE_ENV, " mode");

let dbObject = db.setup();
let testDB;


database()
  .then(result => {
    testDB = result;
    console.log("test testdb", testDB);
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
    win.setSize(1100, 600);
  } else {
    // win.openDevTools();
    win.loadFile("dist/index.html");
    // win.openDevTools();
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


