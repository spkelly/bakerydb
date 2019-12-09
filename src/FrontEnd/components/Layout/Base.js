import React from 'react';
import Nav from './Nav';
import {BrowserRouter} from 'react-router-dom';

const Base = ({children}) =>{

  return (
    <div>
      <BrowserRouter>
        <Nav />
        {children}
      </BrowserRouter>
    </div>
  )
}


export default Base;