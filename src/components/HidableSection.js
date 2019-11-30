import React, { Component } from "react";

class HidableSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    };

    this.toggleVisiblilty = this.toggleVisiblilty.bind(this);
  }

  toggleVisiblilty(e) {
    this.setState({ isVisible: !this.state.isVisible });
  }

  render() {
    let { isVisible } = this.state;
    let { title, children } = this.props;
    let childClasses = ['hidable-section__content'];
    
    if(isVisible){
      childClasses.push('hidable-section__content-visible')
    }
    return (
      <div className="hidable-section" onClick={this.toggleVisiblilty}>
        <div className="hidable-section__header">
          <h2>{title} </h2>
        </div>
        <div
          className={childClasses.join(' ')}
        >
          <div>{children}</div>
        </div>
      </div>
    );
  }
}

export default HidableSection;
