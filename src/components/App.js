import React, { Component } from 'react';
import '../App.css';
import PriceCheckForm from './PriceCheckForm'
import PriceCheckQueryResponses from './PriceCheckQueryResponses'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Search products from suppliers in your area.</h1>
        <PriceCheckForm />
        <PriceCheckQueryResponses />
      </div>
    );
  }
}

export default App;
