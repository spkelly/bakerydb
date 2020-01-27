import React from "react";
import { withRouter } from "react-router-dom";
import Link from "./Link";
import Image from "../images/b_logo.png";
import Button from "./Buttons";
import UpdateContainer from './UpdateNotifier/UpdateContainer';
import StatusIndicator from './StatusIndicator';

import{getDBStatus} from '../api';


// TODO: I don't want to have the updater run on every rerender of the home page, only should check for update when reciveing 
// a notification from the backend


const Home = () => {
  
  return (
    <div className="content">
      <img className="logo" src={Image} />
      <div className="button__container">
        <Link buttonComponent={<Button text="Search" />} path="/search" />
        <Link buttonComponent={<Button text="Menu" />} path="/menu" />
        <Link buttonComponent={<Button text="New Order" />} path="/new-order" />
        <Link buttonComponent={<Button text="Settings" />} path="/settings" />
      </div>
      <UpdateContainer />
      <StatusIndicator  status="offline" title="Database" onCheckForStatus={getDBStatus}/>
    </div>
  );
};

export default withRouter(Home);
