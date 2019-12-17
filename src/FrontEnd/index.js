import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import {BrowserRouter} from 'react-router-dom';
import './scss/main.scss';
// import "../../node_modules/react-datepicker/dist/react-datepicker.scss";
import Base from './components/Layout/Base';

const App = () =>{
  return(
    <Base>
        <Routes />
    </Base>
  )
}



ReactDOM.render(<App/>,document.getElementById('app'));