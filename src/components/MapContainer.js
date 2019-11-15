import React from 'react'
import postcodeList from '../postcodeList.json'
import MapComponent from './MapComponent'

const MapContainer = ({postcode}) => {
    const geocode = postcodeList.find(elem => elem.postcode.toString() === postcode.toString())
    if (geocode) {
        console.log(geocode)
        return (
            <div className="MapContainer">
                Your looking at results that deliver to {geocode.suburb}
                <MapComponent 
                    isMarkerShown 
                    lat={parseFloat(geocode.lat)}
                    lng={parseFloat(geocode.lon)}
                />
            </div>
        )
    } else {
        return null;
    }
    
}

export default MapContainer 
