import React from 'react';
import OrderForm from './OrderForm';
import {getOrderById, updateOrder} from '../api';

class EditOrder extends OrderForm{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    let orderId = window.location.pathname.split("/")[3];
    getOrderById(orderId).then(({customer,isTaxed, deliveryCharge, orderDate,orders, _id},)=>{
      this.setState({customer:{isTaxed:isTaxed, deliveryCharge:deliveryCharge.toFixed(2),date:new Date(orderDate).toISOString(),...customer},items:orders, _id:_id})
    })
  }

  submitForm(){
    let order = this.state;
    order.isTaxed = this.state.customer.isTaxed;
    order.deliveryCharge = this.state.customer.deliveryCharge

    delete order.customer.deliveryCharge;
    delete order.customer.isTaxed;
    updateOrder(order);
  }
}



export default EditOrder;