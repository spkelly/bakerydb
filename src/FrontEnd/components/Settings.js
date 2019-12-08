import React from 'react';
import {ipcRenderer} from 'electron';

const Settings = (props) =>{

  let exportPath = 'test/orders.csv';
  function handleClick(){
    console.log('exporting to: ', exportPath);
  }
  function sendIPCMessage(channel,args){
    ipcRenderer.send(channel,args);
  }
  return(
    <div>
      <div>
        <h3>Export to CSV</h3>
        <input value={exportPath}></input>
        <Button onClick={handleClick}>Export</Button>
      </div>
    </div>
  )
}


export default Settings;