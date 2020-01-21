import React, { Component } from "react";
import UpdateNotifier from './UpdateNotifier';

function dummyCheckForUpdate() {
  console.log("checking for update");
  return new Promise(resolve=>{
    setTimeout(()=>{resolve(false)},1000)
  })
}

function dummmyDownLoadUpdate() {
  console.log("downloading Update");
  return new Promise(resolve=>{
    setTimeout(()=>{resolve(true)},1000)
  })
}

function dummyConfirmUpdate() {
  console.log("confirming update");
  return new Promise(resolve=>resolve(true))
}

class UpdateContainer extends Component {
  state = {
    checkingForUpdate: false
  };

  componentDidMount = () =>{
    // check last time updated and current version number
    // sends getUpdateInfo
    // if > 2 weeks force check for update
    // get
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ checkingForUpdate: true });
  };

  dismissNotifier = () =>{
    this.setState({ checkingForUpdate: false });
  }

  render() {
    let { checkingForUpdate } = this.state;

    return (
      <div className="updater__holder">
        <div className="update__item">
          <p className="text__small">v.0.1.0</p>
        </div>
        <div className="update__item">
          {checkingForUpdate ? (
            <UpdateNotifier onCheck={dummyCheckForUpdate} onDismiss={this.dismissNotifier} onDownload={dummmyDownLoadUpdate} onConfirm={dummyConfirmUpdate}/>
          ) : (
            <a href="#" onClick={this.handleClick} className="text__small update__link">
              click here to check for update
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default UpdateContainer;
