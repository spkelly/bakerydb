import { ipcRenderer, ipcMain } from "electron";
import channels from "../constants";
import { rejects } from "assert";

export function queryOrders(term) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(channels.QUERY_ORDERS, term);
    ipcRenderer.once(channels.QUERY_ORDERS_SUCCESS, (event, arg) => {
      resolve(arg);
    });
    ipcRenderer.once(channels.QUERY_ORDERS_ERROR, (event, arg) => {
      reject(arg);
    });
  });
}

export function getOrderById(id) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(channels.GET_ORDER, id);
    ipcRenderer.once(channels.GET_ORDER_SUCCESS, (event, order) => {
      console.log("success", order);
      resolve(order);
    });
  });
}

export function getCategories() {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(channels.GET_CATEGORIES);
    ipcRenderer.once(channels.GET_CATEGORIES_SUCCESS, (event, categories) => {
      resolve(categories);
    });
  });
}

export function updateOrder(order) {
  console.log("here");
  return new Promise((resolve, reject) => {
    ipcRenderer.send(channels.UPDATE_ORDER, order);
    ipcRenderer.once(channels.UPDATE_ORDER_SUCCESS, (event, orderId) => {
      console.log("success the order id updated is", orderId);
      resolve(orderId);
    });
  });
}

export function fetchMenu() {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(channels.GET_MENU);
    ipcRenderer.once(channels.GET_MENU_SUCCESS, (event, menu) => {
      resolve(menu);
    });
  });
}

export function getProductsByCategory(categoryId) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(channels.GET_PRODUCTS_BY_CAT,categoryId);
    ipcRenderer.once(channels.GET_PRODUCTS_BY_CAT_SUCCESS, (event, products) => {
      resolve(products);
    });
  })
}

export function addOrder(order) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(channels.ADD_ORDER, order, order);
    ipcRenderer.once(channels.ADD_ORDER_SUCCESS, (event, orderId) => {
      resolve(orderId);
    });
  });
}

function fetchOrders(number) {}
