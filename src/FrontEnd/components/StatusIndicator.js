import React, {Component} from 'react';


class StatusIndicator extends Component{

  state = {
    status: 'offline'
  }

  componentDidMount(){
    if(this.props.onCheckForStatus){
      this.props.onCheckForStatus().then((isAvailable)=>{
        if(isAvailable){
          this.setState({status:'online'});

        }
        else{
          this.setState({status:'offline'});
        }
      })
    }
  }

  render(){
    const {title} = this.props;
    const {status} = this.state;
    const classList = ['status__indicator'];
    console.log(status);


    switch(status){
      case 'offline': 
        classList.push('status__indicator-red');
        break;
      case 'online': 
        classList.push('status__indicator-green');
        break;
      case 'checking': 
        classList.push('status__indicator-yellow');
    }
    

    return(
      <div className="status__indicator__holder">
        <p className="text__small">{title}: </p>
        <div className={classList.join(' ')}></div>
        <div><p className="text__small">{status}</p></div>
      </div>
    )
  }

}

export default StatusIndicator;