import React from 'react';
import OrderForm from './OrderForm';

class NewOrder extends OrderForm{
  constructor(props){
    super(props);
  }

  submitForm(){
    console.log('in New form', this.state);
  }
  componentDidMount(){
    // query arders here
    let location = window.location.pathname[3];
    console.log('in New Order');
    console.log(this.state);
  }
}




export default NewOrder;