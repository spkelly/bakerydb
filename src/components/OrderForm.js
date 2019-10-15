import React, { Component } from "react";
import Nav from "./Nav";
import FormInput from './FormInput';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        customer: {
          name: "",
          address: "",
          email: "",
          phone: "",
          date: ""
        },
        items: [],

    };

    this.addToOrder = this.addToOrder.bind(this)
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);
  }

  addToOrder(e) {
    let currentItems = this.state.items;
    currentItems.push({name:'',quantity:'',price:0.00,notes:''})
    this.setState({items:currentItems});
  }
  removeFromOrder(indexToRemove) {
    let newArray = this.state.items.filter((item,index)=>{
      return index != indexToRemove;
    });
    this.setState({items:newArray});
  }

  handleChange(e){
    let name = e.target.name;
    let value = e.target.value;
    this.setState({customer:{...this.state.customer,[name]:value,}})
  }

  handleItemUpdate(e,index){
    let attribute = e.target.name;
    let value = e.target.value
    let itemsCopy = this.state.items;

    itemsCopy[index][attribute] = value;
    this.setState({items:itemsCopy});
    console.log(this.state.items);
  }

  submitForm(){
    console.log('default submitForm', this.state)
  }

  render() {
    let {handleChange} = this;
    let {name,phone,email,address, date} = this.state.customer;
    let items = this.state.items.map((item,index) => {
      return (
        <OrderFormItem
          key={index}
          index={index}
          item={item}
          handleChange={this.handleItemUpdate}
          handleRemove={this.removeFromOrder}
        />
      );
    });

    return (
      <div>
        <Nav />
        <form>
          <FormInput handleChange={handleChange} label="name" value={name} type="text"/>
          <FormInput handleChange={handleChange} label="phone" value={phone} type="tel"/>
          <FormInput handleChange={handleChange} label="email" value={email} type="email"/>
          <FormInput handleChange={handleChange} label="address" value={address} type="text"/>
          <FormInput handleChange={handleChange} label="date" value={date} type="datetime-local"/>
        </form>
        <div className="order-form__orders">
          <h3>Orders Form Test</h3>
          {items}
          <button onClick={this.addToOrder}>Add to order</button>
        </div>
        <button className="" onClick={this.submitForm}>Save Order</button>
      </div>
    );
  }
}



const OrderFormItem = ({item, name, handleChange, handleRemove,index})=>{
  return(
    <div className="order-form__item">
      <input name="name" value={item.name} onChange={e=>handleChange(e,index)}/>
      <input name="quantity" value={item.quantity} onChange={e=>handleChange(e,index)}/>
      <input name="price" value={item.price.toFixed(2)} onChange={e=>handleChange(e,index)}/>
      <textarea name="notes" value={item.notes} onChange={e=>handleChange(e,index)}/>
      <button onClick={e=>handleRemove(index)}>Remove</button>
    </div>
  )
}

export default OrderForm;
