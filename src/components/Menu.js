import React, { Component } from "react";
import Nav from "./Nav";
import Link from './Link'; 
import { getCategories, getProductsByCategory, fetchMenu, getAllProducts } from "../api";

let categories = [
  "Cakes",
  "Bite Sized",
  "Cookies",
  "Cupcakes",
  "Chocolates",
  "Everyday Desserts"
];
let menuItems = [{}, {}, {}, {}, {}, {}, {}, {}];



class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      items: [],
      fetchingCategories: true,
      fetchingProducts: false
    };

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleCategoryChange(category) {
    const addProductsToState = products => this.setState({products})
    category == "all"?
      getAllProducts().then(addProductsToState):
      getProductsByCategory(category).then(addProductsToState)
  }

  componentDidMount() {
    fetchMenu().then(menu =>{
      console.log(menu)
      this.setState({
        categories: menu.categories,
        products: menu.products,
        fetchingCategories: false
      });
    })
  }

  render() {
    return (
      <div className="menu">
        <div className="menu__sidebar">
          <div className="temp-nav-holder">
            <Nav />
          </div>
          <MenuCategories
            categories={this.state.categories}
            callback={this.handleCategoryChange}
            isFetching={this.state.fetchingCategories}
          />
        </div>
        <div className="menu__main">
          <MenuFilterBar />
          <MenuItemsContainer items={this.state.products} />
        </div>
      </div>
    );
  }
}

const MenuCategories = ({ categories, callback, handleAdd, isFetching }) => {
  
  let fetchingSpinner = <h1>loading</h1>;

  let categoryList = categories.map((cat, index) => {
    return (
      <div
        className="category-list-item"
        key={index}
        onClick={() => callback(cat._id)}
      >
        <h2 className="heading__secondary">{cat.name}</h2>
      </div>
    );
  });

  return (
    <section className="menu-categories">
      <div onClick={() => callback("all")} className="category-list-item category-list-item-active">
        <h2 className="heading__secondary">All Items</h2>
      </div>
      {categoryList}
      <div className="u-center-wrapper">
        <button className="menu__btn">+</button>
      </div>
    </section>
  );
};

const MenuFilterBar = () => {
  return (
    <div className="menu-filter-bar">
      <div className="control-wrapper">
        <input className="filter-search" />
        <span className="clear-button">X</span>
      </div>
    </div>
  );
};

const MenuItemsContainer = ({ items }) => {
  console.log(items);
  if(!items) items = [];
  let itemList = items.map((item, index) => {
    let menuComponent = <MenuItem key={index} itemInfo={item} />
    return <Link key={index} buttonComponent={menuComponent} path={'/menu/'  + item._id}/>
  });

  return <div className="menu-items">{itemList}</div>;
};

const MenuItem = ({ itemInfo }) => {
  return <div className="menu__item">
    <p className="paragraph">{itemInfo.name}</p>
  </div>;
};

export default Menu;
