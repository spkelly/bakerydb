import React from 'react';
import OrderForm from './OrderForm';
import {getOrderById, updateOrder} from '../api';
import {withRouter} from 'react-router-dom';

class EditOrder extends OrderForm{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    let orderId = window.location.pathname.split("/")[3];
    getOrderById(orderId).then(({customer,isTaxed, deliveryCharge, orderDate,orders, _id},)=>{
      deliveryCharge = parseFloat(deliveryCharge);
      this.setState({customer:{isTaxed:isTaxed, deliveryCharge:deliveryCharge.toFixed(2),date:new Date(orderDate).toISOString(),...customer},items:orders, _id:_id})
    })
  }

  submitForm(){
    let order = this.state;
    order.isTaxed = this.state.customer.isTaxed;
    order.deliveryCharge = this.state.customer.deliveryCharge

    delete order.customer.deliveryCharge;
    delete order.customer.isTaxed;
    let test = updateOrder(order).then(redirectPath=>{
      if(redirectPath);
      this.props.history.push('/order/'+redirectPath)
      // console.log('here here',response);
    })
  }
}



export default withRouter(EditOrder);