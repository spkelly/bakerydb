import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { fetchMenu, getProductsByCategory } from "../api";
import Counter from "./Counter";

function formatExtrasToNotes(item, ...fields) {
  let result = "";
  console.log("the item", item);
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
        servingSize: 1,
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
    console.log(this.state);
    // check to make sure all feilds are complete
    // convert toppings and flavors in to a note-like format
    // call callback passed to this from menu
    if (selectedItem && selectedCategory) {
      let item = {
        name: selectedItem.name,
        price: selectedItem.price * modifiers.servingSize,
        quantity: modifiers.quantity,
        notes:cakeMode? formatExtrasToNotes(modifiers,"flavor","topping","servingSize"): formatExtrasToNotes(modifiers, "flavor", "topping")
      };
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
      console.log(menu);
      this.setState({ categories: menu.categories });
    });
  }

  changeModifier(modifier, value) {
    this.setState({ modifiers: {...this.state.modifiers,[modifier]: value } });
  }

  render() {
    let {
      itemComplete,
      modifiers,
      selectedCategory,
      selectedTopping,
      selectedFlavor,
      selectedItem
    } = this.state;

    let showServingSizeCounter =
      selectedCategory.name == "Cakes" && selectedItem != "";
    return (
      <div>
        <div className="menu__pane">
          <h4>Select item from menu</h4>
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
            <div>
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

          {/* counters here */}
          <Counter
            value={this.state.modifiers.quantity}
            onChange={newValue => this.changeModifier("quantity", newValue)}
          />
          {showServingSizeCounter ? (
            <Counter
              value={this.state.modifiers.servingSize}
              onChange={newValue => this.changeModifier("servingSize", newValue)}
              minimum={20}
            />
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
