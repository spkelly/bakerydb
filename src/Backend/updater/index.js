const { autoUpdater, CancellationToken } = require("electron-updater");


const initUpdater = (webContents, config) => {
  if(config){
    autoUpdater.setFeedURL(config);
  }
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;
  let cancellationToken = new CancellationToken();

  autoUpdater.on('update-not-available',(e)=>{
    console.log(e);
    webContents.send('update_available',false);
  });
  
  autoUpdater.on('update-downloaded',(e)=>{
    webContents.send('download_complete',true);
  });
  
  autoUpdater.on('update-available', (e)=>{
    console.log(e);
    webContents.send('update_available',true);
  });

  return{
    autoUpdater,
    cancellationToken
  }
}

module.exports = initUpdater;