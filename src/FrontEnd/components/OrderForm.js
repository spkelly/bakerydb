import React, { Component } from "react";
import FormInput from './FormInput';
import moment from 'moment';
import {formatDateTime} from '../../Shared/helpers';
import {CSSTransition} from 'react-transition-group';
import MenuSelectionPane from "./MenuSelectionPane";
import Placeholder from './Placeholder';
import { placeholder } from "@babel/types";
import CheckboxInput from './CheckboxInput';
import DatePicker from 'react-datepicker';



class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        menuVisable:false,
        customer: {
          name: "",
          address: "",
          hasPaid:false,
          email: "",
          datePaid: new Date(),
          phone: "",
          isTaxed: false,
          date: new Date(),
          deliveryCharge: 0,
          tip: 0
        },
        items: [
        ],
        notes:'',
        paymentType: "Venmo"
    };

    this.handleAddFromMenu = this.handleAddFromMenu.bind(this);
    this.addCustomItem = this.addCustomItem.bind(this)
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getDate = this.getDate.bind(this);
    this.changeDatePaid = this.changeDatePaid.bind(this);
    this.changeOrderDate = this.changeOrderDate.bind(this);
    this.toggleTax = this.toggleTax.bind(this);
    this.toggleHasPaid = this.toggleHasPaid.bind(this);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);
    this.handleUpdateNotes = this.handleUpdateNotes.bind(this);
    this.handlePaymentSelect = this.handlePaymentSelect.bind(this);
  }


  
  handleAddFromMenu(item){
    let currentItems = this.state.items;

    currentItems.unshift(item);
    this.setState({items:currentItems, menuVisable: false});
  }



  addCustomItem(e){
    let currentItems = this.state.items;
    currentItems.unshift({name:'',quantity:'',price:0.00,notes:''})
    this.setState({items:currentItems});
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

  getDate(e, target){
    let date = new Date(e.target.value).toISOString || null;
    this.setState({customer:{...this.state.customer,[target]:new Date(date)||0}},_=>console.log('here', this.state))
  }


  changeOrderDate(date){
    this.setState({customer:{...this.state.customer,date:date}})
  }

  changeDatePaid(date){
    console.log(date);
    this.setState({customer:{...this.state.customer,datePaid:date}})
  }

  handleChange(e, attr){
    let value = e.target.value;
    this.setState({customer:{...this.state.customer,[attr]:value,}})
  }

  handleItemUpdate(e,index){
    let attribute = e.target.name;
    let value = e.target.value
    let itemsCopy = this.state.items;
    itemsCopy[index][attribute] = value;
    this.setState({items:itemsCopy});
  }

  handleUpdateNotes(e){
    let notes = e.target.value;
    this.setState({notes:notes});
  }

  submitForm(){

  }

  toggleTax(e){
    this.setState({customer:{...this.state.customer,isTaxed:e.target.checked}})
  }

  toggleHasPaid(e){
    // if customer already paid clear date
    if(this.state.customer.hasPaid){
      this.setState({customer:{...this.state.customer, hasPaid: false, datePaid: null}},_=>console.log(this.state))
    }
    else{
      // if not already paid set date
      this.setState({customer:{...this.state.customer,hasPaid:true},datePaid:Date.now()},_=>console.log(this.state))
    }


  }

  handlePaymentSelect(e){
    let currentPaymentType = this.state.paymentType;
    let newPaymentType = e.target.value;
    this.setState({paymentType: newPaymentType},_=>console.log(this.state));
  }

  render() {
    let {handleChange, getDate} = this;
    let {name,phone, isTaxed, deliveryCharge, email,address, date, tip, datePaid} = this.state.customer;
    console.log("the type of date paid", typeof(datePaid));
    datePaid = new Date(datePaid);
    date = new Date(date);
    console.log(datePaid,date);
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
      <div className="order-form__container">
        <div className="order-form__left">
          <div className="order-form__header">
            <h2 className="heading__secondary">Customer Info</h2>
          </div>
          <form>
            
            <FormInput handleChange={handleChange} label="name" attr="name" value={name} type="text"/>
            <FormInput handleChange={handleChange} label="phone"  attr="phone" value={phone} type="tel"/>
            <FormInput handleChange={handleChange} label="email"  attr="email" value={email} type="email"/>
            <FormInput handleChange={handleChange} label="address"  attr="address" value={address} type="text"/>
            <div>
              <label>Order Date</label>
            </div>
            <div>
              <DatePicker onChange={this.changeOrderDate} selected={date}/>
            </div>
            {/* <FormInput handleChange={this.changeOrderDate} label="Order Date"  attr="date" value={formatDateTime(date)} type="datetime-local"/> */}
            <FormInput handleChange={handleChange} label="Delivery Charge" value={parseFloat(deliveryCharge).toFixed(2)} attr="deliveryCharge" type="number"/>
            <FormInput handleChange={handleChange} label="Tip" value={parseFloat(tip).toFixed(2)} attr="tip" type="number"/>
            {/* <FormInput handleChange={this.changeOrderDate} label="Tip" value={parseFloat(tip).toFixed(2)} attr="tip" type="number"/> */}
            <CheckboxInput onCheck={this.toggleTax} text="Tax?" isChecked={isTaxed} />
            <CheckboxInput onCheck={this.toggleHasPaid} text="Paid?" isChecked={this.state.customer.hasPaid} />
            <div>
              <label>Date Paid</label>
            </div>
            <div>
              <DatePicker onChange={this.changeDatePaid} selected={datePaid}/>
            </div>
            {/* <FormInput isDisabled={!this.state.customer.hasPaid} handleChange={this.changeDatePaid} label="Date Paid"  attr="datePaid" value={this.state.customer.datePaid?formatDateTime(this.state.customer.datePaid):null} type="datetime-local"/> */}
            <label>Payment Type </label>
            <select onChange={this.handlePaymentSelect} value={this.state.paymentType}>
              <option value="Venmo">Venmo</option>
              <option value="Cash">Cash</option>
              <option value="Check">Check</option>
              <option value="Credit">Credit</option>
            </select>            
          </form>
          <button className="btn" onClick={this.submitForm}>Save Order</button>
        </div>
        <div className="order-form__right">
          <div className="note__holder">
            <div>
            <label>Notes</label>
            </div>
            <textarea value={this.state.notes} onChange={this.handleUpdateNotes}></textarea>
          </div>
          <h2 className="heading__secondary">Order</h2>
          {this.state.menuVisable && <MenuSelectionPane  onAdd={this.handleAddFromMenu}/>}
          <div className="flex-row">
            <button className="btn"  onClick={()=>this.setState({menuVisable:!this.state.menuVisable})}>{this.state.menuVisable? "Hide":"Show"} Menu</button>
            <button className="btn"  onClick={this.addCustomItem}>Add Custom Item</button>
          </div>
          <div className="order-form__orders">
            {
              items.length == 0?
              <Placeholder text="no items" height={242} />:
              items
            }
          </div>
          
        </div>
      </div>
    );
  }
}



const OrderFormItem = ({item, handleChange, handleRemove,index})=>{
  let total;
  if(item.servingSize){
    total = parseFloat(item.quantity) * (parseInt(item.servingSize) * parseFloat(item.price))
  }
  else{
    total = item.quantity * item.price;
  }
  return(
    <div className="order-form__item">
      <div className="flex">
        <div className="flex-col">
          <label>Item Name</label>
        </div>

        <div className="flex-col">
          <label>Qty</label> 
        </div>
        {item.servingSize?        
          <div className="flex-col">
            <label>Serving Size</label>
          </div>
        :''}
        <div className="flex-col">
          <label>Unit Price</label>
        </div>
        <div className="flex-col">
          <label>Total</label>
        </div>
        
      </div>
      <div className="flex"> 
        <div className="flex-col">
          <input className="order-form__item-name"name="name" value={item.name} onChange={e=>handleChange(e,index)}/>
        </div>
        <div className="flex-col">
          <input className="order-form__item-number" name="quantity" type="number" value={item.quantity} onChange={e=>handleChange(e,index)}/>
        </div>
        {
          item.servingSize?        
            <div className="flex-col">
              <input readOnly className="order-form__item-number" name="price" type="number" value={item.servingSize} />
            </div>
          :''
        }
        <div className="flex-col">
          <input className="order-form__item-number" name="price" type="number" value={parseFloat(item.price).toFixed(2)} onChange={e=>handleChange(e,index)}/>
        </div>
        <div className="flex-col">
          <input readOnly className="order-form__item-number" name="price" type="number" value={parseFloat(total).toFixed(2)}/>
        </div>
      </div>
      <div className="order-form__item-notes">
        <label>Special Instructions</label><br/>
        <textarea name="notes" value={item.notes} onChange={e=>handleChange(e,index)}/>
      </div>
      <button onClick={e=>handleRemove(index)}>Remove</button>
    </div>
  )
}

export default OrderForm;
