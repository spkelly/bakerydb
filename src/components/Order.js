import React, { Component } from "react";
import Nav from "./Nav";
import InfoBox from "./InfoBox";
import {withRouter} from 'react-router-dom';

class Order extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // fetch Order by Id
  }

  handleClick(editPath){
    this.props.history.push(editPath);
    console.log(window.location)
    
  }

  render() {
    let location = window.location.pathname.split("/");
    let editPath = '/order/edit/' + location[2];
    return (
      <div>
        <Nav />
        <div className="order__header">
          <h1>order id: {location[2]}</h1>
          <button onClick={e=>this.handleClick(editPath)} >Edit </button>
        </div>
        <div className="order-info">
          <div className="order-info__left">
            <InfoBox header="Order Date">Test</InfoBox>
            <InfoBox header="Phone Number">Test</InfoBox>
            <InfoBox header="Email">Test</InfoBox>
            <InfoBox header="Address ">Test</InfoBox>
          </div>
          <div className="order-info__right">

            <InfoBox header="Notes">Test</InfoBox>
            <InfoBox header="Order">
              <div className="order-list__container"></div>
            </InfoBox>
            <div className="order__footer">
              <div>
                <p>Tax:</p>
                <p>Delivery:</p>
                <p>Total:</p>
                </div>
              <div>
                <p>0.00</p>
                <p>0.00</p>
                <p>0.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Order);
