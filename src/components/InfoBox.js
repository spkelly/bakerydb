import React from 'react';


const InfoBox = ({header,children})=>{
  return (
    <div className="infobox">
      <div className="infobox__header">
        {header?<h2 className="infobox__header-title">{header}</h2>:null}
      </div>
      <div className="infobox__content">
        {children}
      </div>
    </div>
  )
}


export default InfoBox;