const electron = require('electron');
const Store = require("electron-store");
const fs = require('fs');


class Settings {
  constructor(){
    this.store = new Store();
  }


  modify(settingName,newValue){
    this.store.set(settingName,newValue);
  }

  getAll(){
    return this.store.store
  }
}

module.exports = Settings;