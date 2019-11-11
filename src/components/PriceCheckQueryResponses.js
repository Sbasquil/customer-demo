import React, { Component } from 'react'
import LoadingResponses from './LoadingResponses'
import ResponseDisplay from './ResponseDisplay'

const PriceCheckQueryResponses = ({ fetching, numOfSuppliers, searchResults, count, searchComplete}) => {
    if (fetching) {
        return (
            <div className="ResponseContainer">
                <LoadingResponses />
            </div>
        )
    } else if (searchComplete) {
        return(
            <div className="ResponseContainer">
                <ResponseDisplay numOfSuppliers={numOfSuppliers} searchResults={searchResults} resultsCount={count} />
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

export default PriceCheckQueryResponses