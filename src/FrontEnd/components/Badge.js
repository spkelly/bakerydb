import React from 'react';



const Badge = ({text, color="green"})=>{
  let classNames = `badge badge-${color}`
  return(
    <div className={classNames}>
      <p className="badge__text">
        {text}
      </p>
    </div>
  )
}


export default Badge;