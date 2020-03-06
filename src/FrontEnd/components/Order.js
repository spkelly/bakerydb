import React, { Component } from "react";
import InfoBox, {FlatBox} from "./InfoBox";
import { withRouter } from "react-router-dom";
import { getOrderById, removeOrder } from "../api";
import Button from './Buttons';
import Badge from "./Badge";
import {getIdFromPath} from '../utils';

//TODO: extract this to other file
const TAX_RATE = 0.0775;

class Order extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      customer: {},
      orders: [],
      notes: "",
      deliveryCharge: 0,
      isTaxed: false,
      orderDate: new Date(),
      error: ""
    };
  }

  componentDidMount() {
    let orderId = getIdFromPath();
    getOrderById(orderId).then(order => {
      this.setState(order);
    });
  }

  handleClick(editPath) {
    this.props.history.push(editPath);
  }

  handleDelete(){
    console.log('here')
    let orderId = getIdFromPath();
    removeOrder(orderId).then(
      ()=> this.props.history.replace('/'),
      ()=> console.log('deletion cancelled')
    )
  }

  formatNotes(notes) {
    return notes.split("\n").map((line, index) => {
      return <p key={index}>{line}</p>;
    });
  }

  formatProductDetails(details) {
    let detailArray = details.split("\n");
    return (
      <ul className="detail-list">
        {detailArray.map((detail, index) => {
          if (detail.length > 0) {
            return <li className="detail-list__item" key={index}> * {detail}</li>;
          }
        })}
      </ul>
    );
  }

  render() {
    let {
      customer,
      orders,
      orderDate,
      isTaxed,
      deliveryCharge,
      paymentType
    } = this.state;
    let orderId = getIdFromPath();
    let editPath = "/order/edit/" + orderId;
    let payStatusBadge = customer.hasPaid ? (
      <Badge text="paid" />
    ) : (
      <Badge text="unpaid" color="red" />
    );
    let subTotal = orders
      .reduce((acc, order) => {
        if (!order.servingSize) {
          console.log("passed if");
          return acc + parseFloat(order.price) * order.quantity;
        } else {
          console.log("failed if");
          return (
            acc + parseFloat(order.price) * order.servingSize * order.quantity
          );
        }
      }, 0)
      .toFixed(2);
    let tax = (isTaxed ? subTotal * TAX_RATE : 0).toFixed(2);
    let total =
      parseFloat(deliveryCharge) +
      parseFloat(tax) +
      parseFloat(subTotal) +
      parseFloat(customer.tip);
    return (
      <div>
        <div className="order__header">
          <h1 className="heading__primary">
            {customer.name}
            <span>{payStatusBadge}</span>
          </h1>
  
        </div>
        <div className="order-info">
          <div className="order-info__left">
            <FlatBox header="Order Date">
              {new Date(customer.date).toLocaleDateString()}
            </FlatBox>

            <FlatBox header="Phone Number"><p>{customer.phone}</p></FlatBox>
            <FlatBox header="Email"><p>{customer.email}</p></FlatBox>
            <FlatBox header="Address "><p>{customer.address}</p></FlatBox>
            <FlatBox header="Payment Type"><p>{paymentType}</p></FlatBox>
            <div className="flex__close">
              <button className="btn" onClick={e => this.handleClick(editPath)}>Edit</button>
              <button className="btn"  onClick={this.handleDelete}>Delete</button>
              
            </div>
          </div>
          <div className="order-info__right">
            <InfoBox header="Notes">
              {this.formatNotes(this.state.notes)}
            </InfoBox>
            <InfoBox header="Order">
              <div>
              <div className="order-list__container">
                {orders.map((order, index) => {
                  console.log(order);

                  return (
                    <div className="item" key={index}>
                      <div className="item__info-line">
                        <div className="item__name">
                          <p>{order.name}</p>
                        </div>
                        <div className="item__info">
                          <div className="item__qty">Qty: {order.quantity}</div>
                          <div className="item__price">$
                            {order.servingSize
                              ? (
                                  parseFloat(order.price) *
                                  parseFloat(order.servingSize)
                                ).toFixed(2)
                              : parseFloat(order.price).toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="item__notes">
                        {this.formatProductDetails(order.notes)}
                      </div>
                    </div>
                    
                  );
                })}
                <div>
                  
                </div>
                </div>
              </div>
              <div className="order__footer">
              <div>
                <p>Tip</p>
                <p>Tax:</p>
                <p>Delivery:</p>
                
              </div>
              <div>
                <p>{customer.tip == 0?'--':'$' + parseFloat(customer.tip).toFixed(2)}</p>
                <p>{tax == 0?'--':'$' + parseFloat(tax).toFixed(2)}</p>
                <p>{deliveryCharge == 0?'--':'$' + parseFloat(deliveryCharge).toFixed(2)}</p>
              </div>
            </div>
            </InfoBox>
            <div className="total__holder">
              <p className="total">Total: ${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Order);
