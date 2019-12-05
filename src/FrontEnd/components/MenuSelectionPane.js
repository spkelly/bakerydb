import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { fetchMenu, getProductsByCategory } from "../api";

function formatExtrasToNotes(item, ...fields){
  let result = '';
  console.log("the item", item)
  for(let field of fields){
    result += `${field}: ${item[field]} \n`
  }
  return result;
}


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
    this.handleAccept = this.handleAccept.bind(this);
  }

  handleAccept() {
    console.log("perparing to add to order");
    console.log("the current state is ");
    // check to make sure all feilds are complete
    // convert toppings and flavors in to a note-like format
    // call callback passed to this from menu

    let item = {
      name : this.state.selectedItem.name,
      price: this.state.selectedItem.price,
      notes: formatExtrasToNotes(this.state.selectedItem,'flavors','toppings')
    }
    this.props.onAdd(item);
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
      console.log(menu);
      this.setState({ categories: menu.categories });
    });
  }
  render() {
    let {
      itemComplete,
      selectedCategory,
      selectedTopping,
      selectedFlavor,
      selectedItem
    } = this.state;
    let noItems = this.state.items.lenth == 0;
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
                varientName={selectedFlavor || "Select a Flavor"}
              />
              <VarientSelector
                handleSelect={varient =>
                  this.setState({ selectedTopping: varient })
                }
                varients={selectedItem.toppings}
                varientName={selectedTopping || "Select a Topping"}
              />
            </div>
          ) : (
            ""
          )}
          <div className="modal__buttons">
            <button onClick={this.handleAccept}>Add to Order</button>
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
