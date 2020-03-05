import React from 'react';


const InfoBox = ({header,children})=>{
  return (
    <section className="infobox">
      <div className="infobox__header">
        {header?<h2 className="infobox__header-title">{header}</h2>:null}
      </div>
      <div className="infobox__content">
        {children}
      </div>
    </section>
  )
}

export const FlatBox = ({header,children})=>{
  return (
    <section className="flatbox">
      <div className="flatbox__header">
        {header?<h2 className="flatbox__header-title">{header}</h2>:null}
      </div>
      <div className="flatbox__content">
        {children}
      </div>
    </section>
  )
}

export default InfoBox;