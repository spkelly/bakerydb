import React, { Component } from "react";
import { getProductById } from "../api";
import HidableSection from "./HidableSection";
import Modal from "./Modal";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: "",
        price: null,
        modifiers: [],
        toppings: [],
        flavors: [],
        categoryId: null
      },
      error:''
    };
  }

  componentDidMount() {
    let id = window.location.pathname.split("/")[2];
    console.log("the id", id);
    getProductById(id).then(product => {
      console.log(product);
      this.setState({ product });
    }).catch(e=>{
      console.log('an error has occurred')
    })
  }

  renderSection(list, title) {
    return (
      <HidableSection title={title}>
        {list.map((listItem, index) => {
          return (
            <div className="list__item" key={index}>
              {listItem}
            </div>
          );
        })}
      </HidableSection>
    );
  }

  render() {
    let { product } = this.state;
    let flavorSection = this.renderSection(product.flavors, "Flavors");
    let toppingSection = this.renderSection(product.toppings, "Toppings");
    return (
      <div className="product">
        <h1 className="heading__primary">{product.name}</h1>
        <p>{product.price}</p>
        {flavorSection}
        {toppingSection}
      </div>
    );
  }
}

export default ProductPage;
