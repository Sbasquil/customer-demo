import React, { Component } from 'react';
import '../App.scss';
import PriceCheckForm from './PriceCheckForm'

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
      </div>
    );
  }
}

export default App;
