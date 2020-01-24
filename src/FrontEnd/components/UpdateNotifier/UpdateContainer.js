import React, { Component } from "react";
import UpdateNotifier from "./UpdateNotifier";
import {
  checkForUpdate,
  downloadUpdate,
  confirmInstall,
  getVersion
} from "../../api";

class UpdateContainer extends Component {
  state = {
    checkingForUpdate: false,
    currentVersion: "0.0.0"
  };

  componentDidMount = () => {
    setTimeout(() => {
      getVersion().then(currentVersion => {
        this.setState({ currentVersion });
      });
    }, 300);
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ checkingForUpdate: true });
  };

  dismissNotifier = () => {
    this.setState({ checkingForUpdate: false });
  };

  render() {
    let { checkingForUpdate, currentVersion } = this.state;
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
