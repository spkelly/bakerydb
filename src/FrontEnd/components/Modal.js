import React, { Component } from "react";

let ModalWrapper = props => {
  let { renderedComponent, handleAccept, handleCancel, isVisible } = props;

  return (
    <div className={"modal__background" + (isVisible ? " " : " hidden")}>
      <div className="modal__wrapper">
        <div className="modal__content">{renderedComponent}</div>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleAccept}>Accept</button>
      </div>
    </div>
  );
};

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: true };
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel(){
    this.setState({isVisible:false});
  }

  render() {
    return <ModalWrapper isVisible={this.state.isVisible} handleCancel={this.handleCancel} renderedComponent={this.props.children} />;
  }
}

export default Modal;
