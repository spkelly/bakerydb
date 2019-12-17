import React from 'react';



const CheckBoxInput = ({text, onCheck, isChecked})=>{
  function handleChange(e){
    console.log("i have been clicked")
    onCheck(e);
  }
  
  return(
  <div>
    <label>{text}</label>
    <input type="checkbox" checked={isChecked} onChange={handleChange}/>
  </div>
  )
}


export default CheckBoxInput;