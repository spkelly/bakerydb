import React from 'react';
import Nav from './Nav';
import {BrowserRouter, HashRouter} from 'react-router-dom';

const Base = ({children}) =>{

  return (
    <div>
      <HashRouter>
        <Nav />
        {children}
      </HashRouter>
    </div>
  )
}


export default Base;