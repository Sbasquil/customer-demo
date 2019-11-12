import React from 'react'
import postcodeList from '../postcodeList.json'
import MapComponent from './MapComponent'

const MapContainer = ({postcode}) => {
    const geocode = postcodeList.find(elem => elem.postcode.toString() === postcode.toString())
    console.log(geocode)
    if (postcode) {
        return (
            <div className="MapContainer">
                <MapComponent 
                    isMarkerShown 
                    lat={Number(geocode.lat)}
                    lng={Number(geocode.lng)}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDGVx5Eq9cuCQsh3g8luYfpuki7_nNtCuw&callback=initMap"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}/>
            </div>
        )
    } else {
        return null;
    }
    
}

export default MapContainer 

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyDGVx5Eq9cuCQsh3g8luYfpuki7_nNtCuw'
//   })(MapContainer);