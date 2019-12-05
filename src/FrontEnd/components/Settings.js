import React from 'react';
import {ipcRenderer} from 'electron';
import channels from '../../Shared/constants';

const testOrder = {
  orderDate: new Date(),
  customer: {
    name: "Seans",
    address: "1201 Balsam Ave.",
    email: "spkelly18@gmail.com"
  },
  orders: [
    {
      name: "Cake",
      quantity: 1,
      price: 40,
      notes: "Chocolate Cake"
    },
    {
      name: "Cake Pops",
      quantity: 12,
      price: 1.75,
      notes: ""
    }
  ]
};

const Settings = (props) =>{

  function sendIPCMessage(channel,args){
    ipcRenderer.send(channel,args);
  }
  return(
    <div>
      test buttons
      <button onClick={()=>{sendIPCMessage(channels.QUERY_ORDERS)}}>Search Test</button>
      <button onClick={()=>{sendIPCMessage(channels.GET_ORDER)}}>Get Order Test</button>
      <button onClick={()=>{sendIPCMessage(channels.IMPORT_ORDERS)}}>Export DB Test</button>
      <button onClick={()=>{sendIPCMessage(channels.EXPORT_DB)}}>Import DB TEST</button>
      <button onClick={()=>{sendIPCMessage(channels.ADD_ORDER, testOrder)}}>New Order Test</button>
    </div>
  )
}


export default Settings;