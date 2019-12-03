import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { fetchMenu, getProductsByCategory } from "../api";

class MenuSelectionPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      itemComplete: false,
      selectedCategory: "",
      selectedTopping: "",
      selectedFlavor: "",
      selectedItem: "",
      categories: [],
      items: [],
      currentItem: {}
    };

    this.renderCategoryList = this.renderCategoryList.bind(this);
  }

  onAccept() {}

  onCancel() {
    this.setState({ currentItem: {}, isVisible: false, itemComplete: false });
  }

  renderCategoryList() {
    return this.state.categories.map((category, index) => {
      return (
        <Dropdown.Item
          key={index}
          onSelect={() => this.selectCategory(category)}
        >
          {category.name}
        </Dropdown.Item>
      );
    });
  }

  renderProductList() {
    return this.state.items.map((item, index) => {
      return (
        <Dropdown.Item key={index} onSelect={() => this.selectProduct(item)}>
          {item.name}
        </Dropdown.Item>
      );
    });
  }

  selectProduct(product) {
    this.setState({ selectedItem: product });
  }

  selectCategory(category) {
    if (category.name != this.state.selectedCategory.name) {
      // Fetch items for selected category
      this.setState({ selectedCategory: category, selectedItem: "" });
      getProductsByCategory(category._id).then(products => {
        this.setState({ items: products });
      });
    }
  }

  componentDidMount() {
    fetchMenu().then(menu => {
      console.log(menu);
      this.setState({ categories: menu.categories });
    });
  }

  handleVarientSelect(name) {
    console.log(name);
  }

  render() {
    console.log(this.state);
    let { itemComplete, selectedCategory, selectedItem } = this.state;
    let noItems = this.state.items.lenth == 0;
    if (selectedItem != {}) {
      console.log(selectedItem);
    }
    return (
      <div>
        <div className="menu__pane">
          <h4>Select item from menu</h4>
          <div className="flex-row">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedCategory.name || "Select Category"}
              </Dropdown.Toggle>
              <Dropdown.Menu>{this.renderCategoryList()}</Dropdown.Menu>
            </Dropdown>
            <DropdownButton title={selectedItem.name || "Select Product"}>
              {this.renderProductList()}
            </DropdownButton>
          </div>
          {selectedItem ? (
            <div>
              <VarientSelector
                handleSelect={varient =>
                  this.setState({ selectedFlavor: varient })
                }
                varients={selectedItem.flavors}
                varientName={this.state.selectedFlavor || "Select a Flavor"}
              />
              <VarientSelector
                handleSelect={varient =>
                  this.setState({ selectedTopping: varient })
                }
                varients={selectedItem.toppings}
                varientName={this.state.selectedTopping || "Select a Topping"}
              />
            </div>
          ) : (
            ""
          )}
          <div className="modal__buttons">
            {itemComplete ? <button>Add To Order</button> : ""}
          </div>
        </div>
      </div>
    );
  }
}

let VarientSelector = ({ handleSelect, varients, varientName }) => {
  return (
    <DropdownButton title={varientName}>
      {varients.map((varient, index) => {
        return (
          <Dropdown.Item
            onSelect={() => handleSelect(varient, varientName)}
            key={index}
          >
            {varient}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
};

export default MenuSelectionPane;
