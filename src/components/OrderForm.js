import React, { Component } from "react";
import Nav from "./Nav";
import FormInput from './FormInput';
import moment from 'moment';
import {formatDateTime} from '../helpers';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        customer: {
          name: "",
          address: "",
          email: "",
          phone: "",
          isTaxed: false,
          date: new Date(),
          deliveryCharge: 0
        },
        items: [
        ],

    };

    this.addToOrder = this.addToOrder.bind(this)
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getDate = this.getDate.bind(this);
    this.toggleTax = this.toggleTax.bind(this);
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

  getDate(e){
    let date = new Date(e.target.value).toISOString || null;
    this.setState({customer:{...this.state.customer,date:new Date(date)||0}})
  }

  handleChange(e, attr){
    let value = e.target.value;
    console.log("whats about to change: ",typeof(value))
    this.setState({customer:{...this.state.customer,[attr]:value,}})
  }

  handleItemUpdate(e,index){
    let attribute = e.target.name;
    let value = e.target.value
    let itemsCopy = this.state.items;
    itemsCopy[index][attribute] = value;

    this.setState({items:itemsCopy});
  }

  submitForm(){

  }

  toggleTax(e){
    this.setState({customer:{...this.state.customer,isTaxed:e.target.checked}})
  }

  render() {
    let {handleChange, getDate} = this;
    let {name,phone, isTaxed, deliveryCharge, email,address, date} = this.state.customer;
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
        <div className="order-form__container">
          <div className="order-form__left">
            <div className="order-form__header">
              <h2>Customer Info</h2>
            </div>
            <form>
              <FormInput handleChange={handleChange} label="name" attr="name" value={name} type="text"/>
              <FormInput handleChange={handleChange} label="phone"  attr="phone" value={phone} type="tel"/>
              <FormInput handleChange={handleChange} label="email"  attr="email" value={email} type="email"/>
              <FormInput handleChange={handleChange} label="address"  attr="address" value={address} type="text"/>
              <FormInput handleChange={getDate} label="Order Date"  attr="date" value={formatDateTime(date)} type="datetime-local"/>
              <FormInput handleChange={handleChange} label="Delivery Charge" value={parseFloat(deliveryCharge).toFixed(2)} attr="deliveryCharge" type="number"/>
              <FormInput handleChange={this.toggleTax} label="tax?"  attr="isTaxed"  value={isTaxed} checked={isTaxed} type="checkBox"/>
            </form>
            <button className="btn" onClick={this.submitForm}>Save Order</button>
          </div>
          <div className="order-form__right">
            <div className="order-form__orders">
              <h2>Order</h2>
              {items}
              <button className="btn"  onClick={this.addToOrder}>Add to order</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



const OrderFormItem = ({item, name, handleChange, handleRemove,index})=>{
  return(
    <div className="order-form__item">
      <div className="flex">
        <div className="flex-col">
          <label>Item Name</label>
        </div>

        <div className="flex-col">
          <label>Qty</label> 
        </div>
        <div className="flex-col">
          <label>Price</label>
        </div>
        
      </div>
      <div className="flex"> 
        <div className="flex-col">
          <input className="order-form__item-name"name="name" value={item.name} onChange={e=>handleChange(e,index)}/>
        </div>
        <div className="flex-col">
          <input className="order-form__item-number" name="quantity" type="number" value={item.quantity} onChange={e=>handleChange(e,index)}/>
        </div>
        <div className="flex-col">
          <input className="order-form__item-number" name="price" type="number" value={item.price} onChange={e=>handleChange(e,index)}/>
        </div>
      </div>
      <div className="order-form__item-notes">
        <label>Notes</label><br/>
        <textarea name="notes" value={item.notes} onChange={e=>handleChange(e,index)}/>
      </div>
      <button onClick={e=>handleRemove(index)}>Remove</button>
    </div>
  )
}

export default OrderForm;
