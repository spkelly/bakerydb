import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import {BrowserRouter} from 'react-router-dom';
import './main.scss';
import Base from './components/Layout/Base';

const App = () =>{
  return(
    <Base>
        <Routes />
    </Base>
  )
}



ReactDOM.render(<App/>,document.getElementById('app'));