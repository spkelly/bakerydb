import React from 'react';
import {capitalizeFirstLetter} from '../helpers';

const FormInput = ({type,handleChange,value,label})=>{
  return(
    <div className="form-item">
      <label>{capitalizeFirstLetter(label)}</label>
      <input name={label} type={type} value={value} onChange={handleChange}/>
    </div>
  )
}

export default FormInput