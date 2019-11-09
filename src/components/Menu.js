import React, { Component } from "react";
import Nav from "./Nav";

let categories = ["Cakes", "Bite Sized", "Cookies", "Cupcakes", "Chocolates", "Everyday Desserts"];
let menuItems = [{},{},{},{},{},{},{},{}]

console.log(menuItems);

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      items: []
    };
  }

  componentDidMount() {
    console.log("mounted");
  }

  render() {
    return (
      <div className="menu">
        <div className="menu__sidebar">
          <div className="temp-nav-holder">
            <Nav />
          </div>
          <MenuCatagories categories={categories} />
        </div>
        <div className="menu__main">
          <MenuFilterBar />
          <MenuItemsContainer items={menuItems} />
        </div>
      </div>
    );
  }
}

const MenuCatagories = ({ categories, handleAdd }) => {
  let categoryList = categories.map((cat, index) => {
    return (
      <div className="category-list-item" key={index}>
        <h2 className="heading__secondary">
        {cat}
        </h2>
      </div>
    );
  });

  return (<section className="menu-categories">
   <div className="category-list-item category-list-item-active"><h2 className="heading__secondary">
       All Items
    </h2></div>
  {categoryList}
  <div className="u-center-wrapper">
  < button className="menu__btn">+</button>
  </div>
  </section>);
};

const MenuFilterBar = () => {
  return <div className="menu-filter-bar">
    <div className="control-wrapper">
      <input className="filter-search" />
      <span className="clear-button">X</span>
    </div>
  </div>;
};

const MenuItemsContainer = ({items}) => {
  console.log('items', items);
  let itemList = items.map((item,index)=>{
    return <MenuItem key={index} itemInfo={item}/> 
  })

  return <div className="menu-items">
    {itemList}
  </div>;
};



const MenuItem = ({itemInfo})=>{  
  return(<div className='menu__item'>

  </div>)
}

export default Menu;
