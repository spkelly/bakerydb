import React from "react";
import "./UpdateNotifier.scss";
import ClipLoader from "react-spinners/ClipLoader";

const UPDATE_STATES = {
  INITIATED: 0,
  CHECKING_FOR_UPDATES: 1,
  UPDATE_AVAILABLE: 2,
  DOWNLOADING_UPDATE: 3,
  DOWNLOAD_COMPLETE: 4,
  NO_UPDATE_AVALABLE: 5,
  ERROR: 6
};

class Updater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateStatus: UPDATE_STATES.CHECKING_FOR_UPDATES,
      errorMessage: null,
      hidden: false
    };
    this.checkForUpdate = this.checkForUpdate.bind(this);
    this.downloadUpdate = this.downloadUpdate.bind(this);
    this.attemptCallback = this.attemptCallback.bind(this);
    this.confirmUpdate = this.confirmUpdate.bind(this);
    this.enumerateUpdateStatus = this.enumerateUpdateStatus.bind(this);
  }

  checkForUpdate() {
    // should call the check for updates call back
    // if this promise resolves to true set state to update available
    // if the promise reoslve to false, set state to no update available
    // if the promise is rejected set state to error
    console.log('checking for updates');
    this.props.onCheck().then((hasUpdate)=>{
      hasUpdate?
        this.setState({updateStatus:UPDATE_STATES.UPDATE_AVAILABLE}):
        this.setState({updateStatus:UPDATE_STATES.NO_UPDATE_AVALABLE});
    })

  }

  componentDidMount(){
    this.checkForUpdate();
  }

  attemptCallback(callBack) {
    try {
      callBack();
    } catch (e) {
      this.handleError();
    }
  }

  downloadUpdate() {
    console.log('downloading update');
    this.setState({updateStatus:UPDATE_STATES.DOWNLOADING_UPDATE})
    this.props.onDownload().then(()=>{
      this.setState({updateStatus:UPDATE_STATES.DOWNLOAD_COMPLETE})
    });
    // this.attemptCallback(this.props.downLoadUpdate);
  }

  confirmUpdate() {
    console.log('confirming update');
    this.props.onConfirm();
  }

  handleError() {
    this.setState({ updateStatus: UPDATE_STATES.ERROR });
  }

  enumerateUpdateStatus(status) {
    switch (status) {
      case UPDATE_STATES.CHECKING_FOR_UPDATES:
        return (
          // Render Loading spinner and status message
          <UpdateStatusWrapper>
            <ClipLoader size={15} color="#dbdbdb"/>
            <UpdaterStatusMessage>Checking for updates...</UpdaterStatusMessage>
          </UpdateStatusWrapper>
        );
      case UPDATE_STATES.UPDATE_AVAILABLE:
        return (
          // render download button and status message
          <UpdateStatusWrapper>
            <UpdaterStatusMessage>Update available!</UpdaterStatusMessage>
            <UpdaterButton cb={this.downloadUpdate} text="download"/>
          </UpdateStatusWrapper>
        );
      case UPDATE_STATES.NO_UPDATE_AVALABLE:
        return (
          // render status message
          <UpdateStatusWrapper>
            <UpdaterStatusMessage>No new updates</UpdaterStatusMessage>
            <UpdaterButton cb={this.props.onDismiss} text="dismiss"/>
          </UpdateStatusWrapper>
        );
      case UPDATE_STATES.DOWNLOADING_UPDATE:
        return (
          // render loading spinner and status message
          <UpdateStatusWrapper>
            <ClipLoader size={15} color="#dbdbdb"/>
            <UpdaterStatusMessage>Downloading...</UpdaterStatusMessage>
          </UpdateStatusWrapper>
        );
      case UPDATE_STATES.DOWNLOAD_COMPLETE:
        return (
        // render status message and confirmation button
        <UpdateStatusWrapper>
          <UpdaterStatusMessage>Download Complete</UpdaterStatusMessage>
          <UpdaterButton cb={this.confirmUpdate} text="install"/>
        </UpdateStatusWrapper>
        )
      case UPDATE_STATES.ERROR:
        return(
          <UpdateStatusWrapper>
            <UpdaterStatusMessage>Errror</UpdaterStatusMessage>
            <UpdaterButton cb={this.props.onDismiss} text="dismiss"/>
          </UpdateStatusWrapper>
        )
      default:
        return <div></div>;
    }
  }

  render() {
    console.log(this.state)
    if(this.state.hidden){
      return <div></div>
    }
    return (
      <div className="updater">
        {this.enumerateUpdateStatus(this.state.updateStatus)}
      </div>
    );
  }
}

const UpdaterButton = ({ cb, text }) => {
  if (!cb) {
    throw new Error("Updater Button " + text + " requires callback");
  }
  return (
    <a className="updater__button" onClick={cb}>
      {text}
    </a>
  );
};

const UpdaterStatusMessage = ({ children }) => {
  return <h3 className="updater__status-message">{children}</h3>;
};

const UpdateStatusWrapper = ({ children }) => {
  return <div className="updater__status-wrapper">{children}</div>;
};

export default Updater;
