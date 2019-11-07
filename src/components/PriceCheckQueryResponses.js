import React, { Component } from 'react'
import LoadingResponses from './LoadingResponses'
import ResponseDisplay from './ResponseDisplay'

class PriceCheckQueryResponses extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
       
    }

    render() {
        if (this.props.fetching) {
            return(
                <div className="ResponseContainer">
                    <LoadingResponses />
                </div>
            )
        } else if (this.props.searchComplete) {
            return(
                <div className="ResponseContainer">
                    <ResponseDisplay />
                </div>
            )
        } else {
            return (
                <div className="PriceCheckQueryResponses">
                    <p>This section will be populated by the response from the form query.</p>
                </div>
            )
        }
    }
}

export default PriceCheckQueryResponses