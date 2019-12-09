import React, { Component } from "react";

import Link from "./Link";
import {
  getProductsByCategory,
  fetchMenu,
  getAllProducts
} from "../api";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
    this.setState({ products: [] }, () => {
      const addProductsToState = products => this.setState({ products });
      category == "all"
        ? getAllProducts().then(addProductsToState)
        : getProductsByCategory(category).then(addProductsToState);
    });
  }

  componentDidMount() {
    fetchMenu().then(menu => {

      this.setState({
        categories: menu.categories,
        products: menu.products,
        fetchingCategories: false
      });
    });
  }

  render() {
    return (
      <div className="menu">
        <div className="menu__sidebar">
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
  // TODO: Change into svg spinner animation
  let fetchingSpinner = <h1>loading</h1>;

  let categoryList = categories.map((cat, index) => {
    return (
      <div
        className="category-list-item"
        key={index}
        onClick={() => callback(cat._id)}
      >
        <h2 className="heading__tertiary">{cat.name}</h2>
      </div>
    );
  });

  return (
    <section className="menu-categories">
      <div
        onClick={() => callback("all")}
        className="category-list-item category-list-item-active"
      >
        <h2 className="heading__tertiary">All Items</h2>
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
  if (!items) items = [];
  let itemList = items.map((item, index) => {
    let menuComponent = <MenuItem itemInfo={item} />;
    return (
      <CSSTransition key={index} classNames="product" timeout={10}>
        <Link
          key={index}
          buttonComponent={menuComponent}
          path={"/menu/" + item._id}
        />
      </CSSTransition>
    );
  });

  return (
    <div className="menu-items">
      <TransitionGroup component={null}>{itemList}</TransitionGroup>
    </div>
  );
};

const MenuItem = ({ itemInfo }) => {
  return (
    <div className="menu__item">
      <p className="paragraph">{itemInfo.name}</p>
    </div>
  );
};

export default Menu;
