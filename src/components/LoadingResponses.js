import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingResponses = () => {
    return (
        <div className="loadingResponses"> 
            <CircularProgress /> 
            <div className="loadingText">
                We are looking for those items.....
            </div>
            
        </div>
    )
}

export default LoadingResponses