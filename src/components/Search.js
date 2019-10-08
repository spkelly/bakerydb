import React from 'react';

import {HomeButton, BackButton } from './NavButtons';
 
const Search = (props) =>{
  return(
    
    <div>
      <div className="nav__holder">
      <HomeButton />
      <BackButton />
      </div>
      Search Page
    </div>
  )
}


export default Search;