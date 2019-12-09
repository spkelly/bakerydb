import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { fetchMenu, getProductsByCategory } from "../api";
import Counter from "./Counter";

function formatExtrasToNotes(item, ...fields) {
  let result = "";
  for (let field of fields) {
    result += `${field}: ${item[field]} \n`;
  }
  return result;
}

class MenuSelectionPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: "",
      selectedItem: "",
      categories: [],
      items: [],
      currentItem: {},
      modifiers: {
        flavor: "",
        topping: "",
        servingSize: 20,
        quantity: 1
      }
    };

    this.renderCategoryList = this.renderCategoryList.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.changeModifier = this.changeModifier.bind(this);
  }

  handleAccept() {
    let { selectedItem, selectedCategory, modifiers } = this.state;
    let cakeMode = selectedCategory.name == 'Cakes';
    // check to make sure all feilds are complete
    // convert toppings and flavors in to a note-like format
    // call callback passed to this from menu
    if (selectedItem && selectedCategory) {
      let item = {
        name: selectedItem.name,
        price: selectedItem.price,
        quantity: modifiers.quantity,
        notes:cakeMode? formatExtrasToNotes(modifiers,"flavor","topping","servingSize"): formatExtrasToNotes(modifiers, "flavor", "topping")
      };
      if(cakeMode){
        item.servingSize = modifiers.servingSize;
      }
      this.props.onAdd(item);
      this.setState({ isVisible: false, selectCategory: "", selectedItem: "" });
    }
  }

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
      this.setState({ categories: menu.categories });
    });
  }

  changeModifier(modifier, value) {
    this.setState({ modifiers: {...this.state.modifiers,[modifier]: value } });
  }

  render() {
    let {
      modifiers,
      selectedCategory,
      selectedItem
    } = this.state;

    let showServingSizeCounter =
      selectedCategory.name == "Cakes" && selectedItem != "";
    return (
        <div className="menu__pane">
          <div className="menu__pane-header">
            <h2 className="heading__tertiary">Select item from menu</h2>
          </div>
          <div className="flex-row">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                {selectedCategory.name || "Select Category"}
              </Dropdown.Toggle>
              <Dropdown.Menu>{this.renderCategoryList()}</Dropdown.Menu>
            </Dropdown>
            <DropdownButton title={selectedItem.name || "Select Product"}>
              {this.renderProductList()}
            </DropdownButton>
          </div>
          {selectedItem ? (
            <div className="flex-row">
              <VarientSelector
                handleSelect={varient =>
                  this.setState({
                    modifiers: Object.assign({}, this.state.modifiers, {
                      flavor: varient
                    })
                  })
                }
                varients={selectedItem.flavors}
                varientName={modifiers.flavor || "Select a Flavor"}
              />
              <VarientSelector
                handleSelect={varient =>
                  this.setState({
                    modifiers: Object.assign({}, this.state.modifiers, {
                      topping: varient
                    })
                  })
                }
                varients={selectedItem.toppings}
                varientName={modifiers.topping || "Select a Topping"}
              />
            </div>
          ) : (
            ""
          )}
          <div className="flex-row">
            <div className="counter__holder">
              <h1>Quantity</h1>
              <Counter
                value={this.state.modifiers.quantity}
                onChange={newValue => this.changeModifier("quantity", newValue)}
              />
            </div>
            {
            showServingSizeCounter ? (
              <div className="counter__holder">
                <h1>Serving Size</h1>
                <Counter
                  value={this.state.modifiers.servingSize}
                  onChange={newValue => this.changeModifier("servingSize", newValue)}
                  minimum={20}
                />
              </div>) : 
              ("")}
          </div>
          

          <div className="modal__buttons">
            <button onClick={this.handleAccept}>Add to Order</button>
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
