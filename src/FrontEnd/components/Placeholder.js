import React from 'react';


export default ({text,height})=>{

  const placeholderstyle = {
    height: `${height}px`
  }
  return(
  <div className="placeholder" style={placeholderstyle}>
    <p className="placeholder__text">
      {text}
    </p>
  </div>
  )
}