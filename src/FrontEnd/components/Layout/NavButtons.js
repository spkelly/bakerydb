import React from 'react';
import {withRouter} from 'react-router-dom';



let NavButton = ({loc, image, history, content}) => {
  function navigate(){
    if(loc== 'back'){

      history.goBack();
    }
    else{

      history.push(loc)
    }
  }
  if(window.location.hash == "#/") return <div />

  return (<div onClick={navigate} className="navigation__button" >
    <p className='paragraph'>{content}</p>
  </div>);
}

NavButton = withRouter(NavButton);

export const BackButton = () =>{
  return <NavButton loc="back" content="<" />
}


export const HomeButton = () =>{
  return <NavButton loc="/" content="home"/>
}

