import React from "react";
import { getUnpaid } from "../api";
import {withRouter} from 'react-router';

class UnpaidOrders extends React.Component {
  state = {
    orders: []
  };

  componentDidMount() {
    console.log("fetching unpaid orders");

    getUnpaid().then((unpaidOrders)=>{
      this.setState({orders:unpaidOrders})
    })
  }

  handleClick = (id) =>{
    this.props.history.push(`/order/${id}`);
  }

  renderOrders = () => {
    if (this.state.orders.length == 0) {
      return (
        <div className="empty" >
          <h3>there are no undpaid orders</h3>
        </div>
      );
    }

    return this.state.orders.map((order, index) => {
      if(order.customer.name.length == 0){
        order.customer.name = 'No Name';
      }


      return <div className="unpaid-orders__list-item" key={index} onClick={()=>this.handleClick(order._id)}>
        <div className="unpaid-orders__col-lg">
          <p>{order.customer.name}</p>
        </div>
        <div className="unpaid-orders__col-sm">         
          <p>{new Date(order.customer.date).toLocaleDateString()}</p>
        </div>
        <div className="unpaid-orders__col-sm">         
          <p>{new Date(order.dateCreated).toLocaleDateString()}</p>
        </div>
      </div>;
    });
  };


  render() {
    return (
      <div className="unpaid-orders">
        <div className="unpaid-orders__header">
          <div className="unpaid-orders__col-lg">
          <p>Customer Name</p>
          </div>
          <div className="unpaid-orders__col-sm">         
            <p>Order Date</p>
          </div>
          <div className="unpaid-orders__col-sm">          
            <p>Creation Date</p>
          </div>
 

        </div>
        {/* <h3 className="unpaid-orders__title">unpaid orders</h3> */}
        <div className="unpaid-orders__list">{this.renderOrders()}</div>
      </div>
    );
  }
}


export default withRouter(UnpaidOrders);