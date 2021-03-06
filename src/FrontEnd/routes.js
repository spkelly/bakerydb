import { Route, Switch } from "react-router";
import React from 'react'
import Order from "./components/Order";
import Search from "./components/Search";
import Settings from "./components/Settings";
import Home from "./components/Home";
import NewOrder from './components/NewOrder';
import EditOrder from './components/EditOrder';
import Menu from './components/Menu';
import ProductPage from './components/ProductPage';



const routes = () => {
  return (
    <Switch>
      <Route path="/search" component={Search} />
      <Route path="/order/edit/:id" component={EditOrder} />
      <Route path="/order/:id" component={Order} />
      <Route path="/new-order" component={NewOrder} />
      <Route path="/settings" component={Settings} />
      <Route path="/menu/:id" component={ProductPage} />
      <Route path="/menu" component={Menu} />
      <Route path="/" component={Home} />
    </Switch>
  );
};


export default routes;