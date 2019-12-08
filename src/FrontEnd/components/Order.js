import React, { Component } from "react";
import Nav from "./Nav";
import InfoBox from "./InfoBox";
import { withRouter } from "react-router-dom";
import { getOrderById } from "../api";

//TODO: extract this to other file
const TAX_RATE = 0.077;

class Order extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      customer: {},
      orders: [],
      deliveryCharge: 0,
      isTaxed: false,
      orderDate: new Date(0),
      error: ""
    };
  }

  componentDidMount() {
    // fetch Order by Id
    getOrderById(window.location.pathname.split("/")[2]).then(order => {
      this.setState(order, () => {
        console.log(this.state);
      }).catch(e => {
        console.log('An error has occured');
        console.log(e);
      });
    });
  }

  handleClick(editPath) {
    this.props.history.push(editPath);
    console.log(window.location);
  }

  render() {
    let { customer, orders, orderDate, isTaxed, deliveryCharge } = this.state;
    let location = window.location.pathname.split("/");
    let editPath = "/order/edit/" + location[2];
    let subTotal = orders
      .reduce((acc, order) => acc + order.price * order.quantity, 0)
      .toFixed(2);
    let tax = (isTaxed ? subTotal * TAX_RATE : 0).toFixed(2);
    console.log("types", typeof deliveryCharge, typeof tax, typeof subTotal);
    console.log(parseInt(deliveryCharge).toFixed(2));
    let total =
      parseFloat(deliveryCharge) + parseFloat(tax) + parseFloat(subTotal);
    console.log(typeof parseFloat(deliveryCharge));
    return (
      <div>
        <Nav />
        <div className="order__header">
          <h1>{customer.name}</h1>
          <button onClick={e => this.handleClick(editPath)}>Edit </button>
        </div>
        <div className="order-info">
          <div className="order-info__left">
            <InfoBox header="Order Date">
              {new Date(orderDate).toLocaleDateString()}
            </InfoBox>
            <InfoBox header="Phone Number">{customer.phone}</InfoBox>
            <InfoBox header="Email">{customer.email}</InfoBox>
            <InfoBox header="Address ">{customer.address}</InfoBox>
          </div>
          <div className="order-info__right">
            <InfoBox header="Notes">Test</InfoBox>
            <InfoBox header="Order">
              <div className="order-list__container">
                {orders.map((order, index) => {
                  return (
                    <div className="item" key={index}>
                      <div className="item__info-line">
                        <div className="item__name">
                          <p>{order.name}</p>
                        </div>
                        <div className="item__info">
                          <div className="item__qty">{order.quantity}</div>
                          <div className="item__price">
                            {order.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="item__notes">
                        <p>{order.notes ? order.notes : ""}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </InfoBox>
            <div className="order__footer">
              <div>
                <p>Tax:</p>
                <p>Delivery:</p>
                <p>Total:</p>
              </div>
              <div>
                {isTaxed ? <p>{tax}</p> : ""}
                <p>{parseFloat(deliveryCharge).toFixed(2)}</p>
                <p>{total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Order);
