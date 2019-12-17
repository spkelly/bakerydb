import React from "react";
import { capitalizeFirstLetter } from "../../Shared/helpers/";

const FormInput = props => {
  let { isDisabled, type, handleChange, value, label, checked, attr } = props;

  function performCallback(e) {
    handleChange(e, attr);
  }
  return (
    <div className="form-item">
      <div>
        <label>{capitalizeFirstLetter(label)}</label>
      </div>
      <input
        disabled={isDisabled}
        className="order-form__input"
        checked={checked}
        name={label}
        type={type}
        value={value}
        onChange={performCallback}
      />
    </div>
  );
};

export default FormInput;
