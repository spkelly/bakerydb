import React from 'react';
import {capitalizeFirstLetter} from '../helpers';

const FormInput = ({type,handleChange,value,label,checked})=>{
  return(
    <div className="form-item">
      <div>
      <label>{capitalizeFirstLetter(label)}</label>
      </div>
      <input className="order-form__input" checked={checked} name={label} type={type} value={value} onChange={handleChange}/>
    </div>
  )
}

export default FormInput