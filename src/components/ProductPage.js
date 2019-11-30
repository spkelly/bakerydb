import React, { Component } from "react";
import { getProductById } from "../api";
import HidableSection from './HidableSection';



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
      }
    };
  }

  componentDidMount() {
    let id = window.location.pathname.split("/")[2];
    console.log("the id", id);
    getProductById(id).then(product => {
      console.log(product);
      this.setState({ product });
    });
  }


  renderSection(list, title){
    return(
      <HidableSection title={title}>
        {
          list.map((listItem, index)=>{
            return <div key={index}>{listItem}</div>
          })
        }
      </ HidableSection >
    )
  }

  render() {
    let { product } = this.state;
    let flavorSection = this.renderSection(product.flavors, 'flavors');
    let toppingSection = this.renderSection(product.toppings, 'toppings');
    return (
      <div>
        <h1>{product.name}</h1>
        <h1>{product.price}</h1>
        {flavorSection}
        {toppingSection}
      </div>
    );
  }
}

export default ProductPage;
