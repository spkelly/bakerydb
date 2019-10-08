import React from "react";
import { withRouter } from "react-router-dom";

const Home = props => {
  const handleClick = path => {
    props.history.push(path);
  };

  return (
    <div className="content">
      <h1>BakeryDB</h1>
      <div className="button__container">
        <button onClick={() => handleClick("/search")}> Search</button>
        <button onClick={() => handleClick("/settings")}> Settings</button>
        <button onClick={() => handleClick("/new-order")}> New Order</button>
      </div>
    </div>
  );
};

export default withRouter(Home);
