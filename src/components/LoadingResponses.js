import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingResponses = (fetching) => {
    return (
        <div className="loadingResponses"> 
            <CircularProgress />
        </div>
    )
}

export default LoadingResponses