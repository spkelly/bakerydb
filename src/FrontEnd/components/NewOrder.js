import React from 'react';
import OrderForm from './OrderForm';
import {withRouter} from 'react-router-dom';
import {addOrder} from '../api/';


function validateOrder(order){
  if(order.name)
  return false;
}

class NewOrder extends OrderForm{
  constructor(props){
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(){

    let orderToBe = this.state;
    orderToBe.orderDate = new Date();
    orderToBe.dateCreated = new Date();


    orderToBe.isTaxed = this.state.customer.isTaxed;
    orderToBe.deliveryCharge = this.state.customer.deliveryCharge;

    delete orderToBe.customer.deliveryCharge;
    delete orderToBe.menuVisable;
    delete orderToBe.customer.isTaxed;
    orderToBe.orders = this.state.items;
    console.log(this.state);
    addOrder(orderToBe).then((orderId)=>{
      console.log('the order id', orderId)
      this.props.history.push('/order/'+orderId);
    });
  }

}




export default withRouter(NewOrder);