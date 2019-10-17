import React, { Component } from "react";
import Nav from "./Nav";
import { queryOrders } from "../api";
import { withRouter} from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      isFetching: false,
      searchResults: null,
      err: false,
      errMessage: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  handleInput(e) {
    this.setState({ input: e.target.value });
  }

  handleClick() {
    this.setState({ isFetching: true });
    queryOrders(this.state.input).then(resp => {
      this.setState({ searchResults: resp, isFetching: false });
    });
  }

  navigate(path){
    console.log((`/orders/${path}`));
    this.props.history.push(`/order/${path}`);
  }

  renderResults() {
    if (this.state.searchResults.length == 0) {
      return <div className="error__box">No Results Found</div>;
    }

    if(this.state.isFetching){
      return <div>loading</div>
    }
    
    let results = this.state.searchResults.map((result,index)=>{
 
      return <div key={index} onClick={e=>this.navigate(result._id)}className="result__item">
        <p className="result__title">{result.customer.name}</p>
        <p className="result__date">{new Date(result.orderDate).toLocaleDateString()}</p>
      </div>
      });

    return (
      <div className="results">
        <div className="results__header">
          <div className="results__header-col">Customer Name</div>
          <div className="results__header-col">Order Date</div>
        </div>
        {results}
      </div>
      )
  }

  render() {
    const { isFetching, searchResults } = this.state;
    return (
      <div>
        <Nav />
        <div className="search__input">
          <input className="input" onInput={this.handleInput} />
          <button className="btn" onClick={this.handleClick}>Search</button>
        </div>
        <div className="search__results">
          {searchResults ? this.renderResults() : ""}
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
