import React from "react";

const PrimaryButton = ({ text }) => {
  return <button className="navigation__button">
    <p className="paragraph">{text}</p>
  </button>;
};

export default PrimaryButton;
