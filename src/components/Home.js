import React from "react";
import { withRouter } from "react-router-dom";

import Image from '../images/b_logo.png';

const Home = props => {
  console.log(props.history)
  const handleClick = path => {
    props.history.push(path);
  };

  return (
    <div className="content">
      <img className="logo" src={Image} />
      <div className="button__container">
        <button className="navigation__button" onClick={() => handleClick("/search")}><p className="paragraph">Search</p></button>
        <button className="navigation__button" onClick={() => handleClick("/new-order")}><p className="paragraph"> New Order</p></button>
        <button className="navigation__button" onClick={() => handleClick("/settings")}><p className="paragraph">Settings</p></button>
      </div>
    </div>
  );
};

export default withRouter(Home);