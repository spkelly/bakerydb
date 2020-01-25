import React, { Component } from "react";
import UpdateNotifier from "./UpdateNotifier";
import {
  checkForUpdate,
  downloadUpdate,
  confirmInstall,
  getVersion
} from "../../api";


import electron from 'electron';


let currentVersion = electron.remote.app.getVersion();
console.log(currentVersion);


class UpdateContainer extends Component {
  state = {
    checkingForUpdate: false
  };

  componentDidMount = () => {
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ checkingForUpdate: true });
  };

  dismissNotifier = () => {
    this.setState({ checkingForUpdate: false });
  };

  render() {
    let { checkingForUpdate } = this.state;
    console.log(this.state);
    return (
      <div className="updater__holder">
        <div className="update__item">
          <p className="text__small">v{currentVersion}</p>
        </div>
        <div className="update__item">
          {checkingForUpdate ? (
            <UpdateNotifier
              onCheck={checkForUpdate}
              onDownload={downloadUpdate}
              onConfirm={confirmInstall}
              onDismiss={this.dismissNotifier}
            />
          ) : (
            <a
              href="#"
              onClick={this.handleClick}
              className="text__small update__link"
            >
              click here to check for update
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default UpdateContainer;
