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
    let childClasses = ["hidable-section__content", "u_flex-row"];

    if (isVisible) {
      childClasses.push("hidable-section__content-visible");
    }
    return (
      <div className="hidable-section" >
        <div className="hidable-section__header" onClick={this.toggleVisiblilty}>
          <h2 className="heading__secondary">
            {title} <span>{isVisible ? "-" : "+"}</span>{" "}
          </h2>
        </div>
        <div className={childClasses.join(" ")}>{children}</div>
      </div>
    );
  }
}

export default HidableSection;
