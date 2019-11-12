import React from 'react'
import ResponseTable from './ResponseTable'
import propTypes from 'prop-types'

const ResponseDisplay = ({numOfSuppliers, resultsCount, searchResults}) => {
    if (resultsCount) {
        return (
        <div className="ResponseDisplay"> 
            <div className="ResponseDisplay__Header">
                Look at this! 
            </div>
            <div className="ResponseDisplay__Text">
                There are {resultsCount} results from {numOfSuppliers} suppliers in that area. Check out some of the top results below!
            </div>
            <div className="ResponseDisplay__Table">
                <ResponseTable searchResults={searchResults}/> 
            </div>
        </div>
        )
    } else {
        return(
            <div className="ResponseDisplay"> 
                <div className="ResponseDisplay__Header">
                    Oh No! 
                </div>
                <div className="ResponseDisplay__Text">
                    We couldn't find any results from the {numOfSuppliers} suppliers in that area. Maybe try another search term. 
                </div>
            </div>
        )
    }
    
}

ResponseDisplay.propTypes = {
    numOfSuppliers: propTypes.number.isRequired,
    resultsCount: propTypes.number.isRequired,
    searchResults: propTypes.array.isRequired
}

export default ResponseDisplay