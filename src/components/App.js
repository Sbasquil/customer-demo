import React, { Component } from 'react';
import '../App.scss';
import PriceCheckForm from './PriceCheckForm'
import PriceCheckQueryResponses from './PriceCheckQueryResponses'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInitiated: false,
      fetching: false
    }
  }

  handleSearchStatus = () => {

  }

  handleFetchingStatus = () => {

  }

  render() {
    const { searchInitiated , fetching } = this.state
    return (
      <div className="App">
        <h1>Search products from suppliers in your area.</h1>
        <PriceCheckForm searchInitiated={searchInitiated} fetching={fetching}/>
        <PriceCheckQueryResponses />
      </div>
    );
  }
}

export default App;
