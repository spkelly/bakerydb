import React from 'react';
import OrderForm from './OrderForm';
import {withRouter} from 'react-router-dom';
import {addOrder} from '../api/';

class NewOrder extends OrderForm{
  constructor(props){
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(){
    console.log('here')
    let orderToBe = this.state;
    orderToBe.orderDate = new Date();
    orderToBe.dateCreated = new Date();
    orderToBe.orders = this.state.items;
    console.log('in New form', orderToBe);
    addOrder(orderToBe).then((orderId)=>{
      this.props.history.push('/order/'+orderId);
    });
  }
  componentDidMount(){
    // query arders here
    let location = window.location.pathname[3];
    console.log('in New Order');
    console.log(this.state);
  }
}




export default withRouter(NewOrder);