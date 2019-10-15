import { ipcRenderer, ipcMain } from "electron";
import channels from "../constants";
import { rejects } from "assert";

export function queryOrders(term) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(channels.QUERY_ORDERS, term);
    ipcRenderer.once(channels.QUERY_ORDERS_SUCCESS, (event, arg) => {
      console.log('in queryOrders() ',arg)
      resolve(arg);
    });
    ipcRenderer.once(channels.QUERY_ORDERS_ERROR, (event, arg) => {
      reject(arg);
    });
  });
}

export function getOrderById(id){
  return new Promise((resolve,reject)=>{
    ipcRenderer.send(channels.GET_ORDER,id);
    ipcRenderer.on(channels.GET_ORDER_SUCCESS,(event,order)=>{
      console.log('success',order);
      resolve(order)
    })
  });
}

export function updateOrder(order){
  return new Promise((resolve, reject)=>{

    ipcRenderer.send(channels.UPDATE_ORDER,order);
    ipcRenderer.on(channels.GET_ORDER_SUCCESS,(event,order)=>{
      console.log('success',order);
      resolve(true);
    });
  });
}

export function addOrder(order) {
  return new Promise((resolve, reject)=>{
    ipcRenderer.send(channels.ADD_ORDER,order,order);
    ipcRenderer.on(channels.ADD_ORDER_SUCCESS, (event,orderId)=>{
      resolve(orderId);
    });
  });
}



function fetchOrders(number) {}
