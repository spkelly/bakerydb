import React from "react";
import { withRouter } from "react-router-dom";
import Link from "./Link";
import Image from "../images/b_logo.png";
import Button from "./Buttons";

const Home = () => {
  return (
    <div className="content">
      <img className="logo" src={Image} />
      <div className="button__container">
        <Link buttonComponent={<Button text="Search" />} path="/search" />
        <Link buttonComponent={<Button text="Menu" />} path="/menu" />
        <Link buttonComponent={<Button text="New Order" />} path="/new-order" />
        <Link buttonComponent={<Button text="Settings" />} path="/settings" />
      </div>
    </div>
  );
};

export default withRouter(Home);
