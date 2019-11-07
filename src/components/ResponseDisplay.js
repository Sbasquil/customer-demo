import React from 'react'
import ResponseTable from './ResponseTable'

const ResponseDisplay = () => {
    return (
        <div className="ResponseDisplay"> 
                <div className="ResponseDisplay__Header">
                    Look at this! 
                </div>
                <div className="ResponseDisplay__Text">
                    There are 57 results from 32 suppliers in that area. Check out some of the top results below!
                </div>
                <div className="ResponseDisplay__Table">
                    <ResponseTable /> 
                </div>
        </div>
    )
}

export default ResponseDisplay