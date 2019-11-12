import React from 'react'
import LoadingResponses from './LoadingResponses'
import ResponseDisplay from './ResponseDisplay'
import propTypes from 'prop-types'

const PriceCheckQueryResponses = ({fetching, numOfSuppliers, searchResults, count, searchComplete, requestError}) => {
    if (fetching) {
        return (
            <div className="ResponseContainer">
                <LoadingResponses />
            </div>
        )
    } else if (searchComplete) {
        return (
            <div className="ResponseContainer">
                <ResponseDisplay numOfSuppliers={numOfSuppliers} searchResults={searchResults} resultsCount={count} />
            </div>
        )
    } else {
        if (requestError) {
            return (
                <div className="RequestError">
                    {requestError}
                </div>
            )
        } else { return null}
    }
}

PriceCheckQueryResponses.propTypes = {
    fetching: propTypes.bool.isRequired,    
    numOfSuppliers: propTypes.number.isRequired,
    searchResults: propTypes.array.isRequired,
    count: propTypes.number.isRequired, 
    searchComplete: propTypes.bool.isRequired,
    requestError: propTypes.string.isRequired 
}

export default PriceCheckQueryResponses