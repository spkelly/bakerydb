import React from 'react';
import {withRouter} from 'react-router-dom';



let NavButton = ({loc, image, history}) => {
  console.log('test',location)
  function navigate(){
    if(loc== 'back'){
      history.goBack();
    }
    else{
      console.log(loc)
      history.push(loc)
    }
  }

  return (<div onClick={navigate} className="navigation__button" >
    <p>{loc}</p>
  </div>);
}

NavButton = withRouter(NavButton);

export const BackButton = () =>{
  return <NavButton loc="back" />
}


export const HomeButton = () =>{
  return <NavButton loc="/" />
}

