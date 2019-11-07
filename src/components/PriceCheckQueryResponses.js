import React, { Component } from 'react'
import LoadingResponses from './LoadingResponses'

class PriceCheckQueryResponses extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
       
    }

    render() {
        if (!this.props.fetching) {
            return (
                <div className="PriceCheckQueryResponses">
                    <p>this section will be populated by the response from the form query.</p>
                </div>
            )
        } else {
            return(
                <div>
                    <LoadingResponses />
                </div>
            )
        }
    }
}

export default PriceCheckQueryResponses