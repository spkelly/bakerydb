import React from 'react';
import Nav from './Nav';
import {BrowserRouter} from 'react-router-dom';

const Base = ({children}) =>{
  console.log('here')
  console.log("in nav render statement ", Date.now());
  console.log("the path is ", window.location.pathname)
  console.log("on the home page",window.location.pathname == "/")
  return (
    <div>
      <BrowserRouter>
      <Nav />
        {console.log('here')}
        {children}
      </BrowserRouter>
    </div>
  )
}


export default Base;