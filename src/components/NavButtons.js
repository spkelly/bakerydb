import React from 'react';
import {withRouter} from 'react-router-dom';



let NavButton = ({loc, image, history, content}) => {
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

