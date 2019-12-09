import React from 'react';


export default ({text,height})=>{

  const placeholderStyle = {
    height: `${height}px`
  }
  return(
  <div className="placeholder" style={placeholderStyle}>
    <p className="placeholder__text">
      {text}
    </p>
  </div>
  )
}