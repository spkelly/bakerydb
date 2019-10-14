import React from 'react';
import OrderForm from './OrderForm';
import {getOrderById} from '../api';

class EditOrder extends OrderForm{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    let orderId = window.location.pathname.split("/")[3];
    console.log('in Edit Order');
    console.log(this.state,orderId);
    getOrderById(orderId).then(({customer,orderDate,orders},)=>{
      this.setState({customer:{date:orderDate,...customer},items:orders})
    })
  }

  submitForm(){
    console.log('in edit form', this.state);
  }
}



export default EditOrder;