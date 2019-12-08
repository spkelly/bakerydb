import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state={
      value:props.minimum || 1
    }

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment(){
    this.setState({value:++this.state.value},_=>{
      this.props.onChange(this.state.value)
    })
  }

  decrement(){
    let minimum = this.props.minimum || 1;

    if(this.state.value - 1 >= minimum){
      this.setState({value:--this.state.value},_=>{
        this.props.onChange(this.state.value)
      })
    }


  }

  render() {
    let { onChange, value, minimum } = this.props;

    return (
      <div>
        <button onClick={this.increment}>+</button>
        <input readOnly value={this.state.value}/>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

export default Counter;
