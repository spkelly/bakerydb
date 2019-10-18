import React from 'react';
import OrderForm from './OrderForm';
import {getOrderById, updateOrder} from '../api';

class EditOrder extends OrderForm{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    let orderId = window.location.pathname.split("/")[3];
    console.log('in Edit Order');
    console.log(this.state,orderId);
    getOrderById(orderId).then(({customer,orderDate,orders, _id},)=>{
      this.setState({customer:{date:new Date(orderDate).toISOString(),...customer},items:orders, _id:_id})
    })
  }

  submitForm(){
    console.log('in edit form', this.state);
    updateOrder(this.state);
  }
}



export default EditOrder;