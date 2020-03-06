import React, {Component} from 'react';

class ExtendoBox extends Component{
  state = {
    isExtended:false
  }


  toggleExtend = ()=>{
    this.setState({ isExtended:!this.state.isExtended })
  }
  
  render(){
    let className = 'order-list__container' + (this.state.isExtended?'-extended':'');


    return(
      <div className="extendo">
        <div className={className}>
          {this.props.children}
        </div>
        <div>
          {this.props.footer}
        </div>
        <div className={"extendo_button" + (this.state.isExtended?' extendo_button-rotated':'')} onClick={this.toggleExtend}>^</div>
      </div>
    )
  }
}


export default ExtendoBox;