import React from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"


const Map = ({ lat, lng}) => {
  return (
    <GoogleMap 
      defaultZoom={16} 
      defaultCenter={{ lat, lng }} 
    > 
      <Marker position={{ lat, lng }} />
    </GoogleMap>

  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const MapComponent = ({ lat, lng }) => {

  return <div className="MapComponent">
    <WrappedMap 
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`}
      loadingElement={<div style={{height: "100%"}}/>}
      containerElement={<div style={{ height: "100%"}} />}
      mapElement={<div style={{ height: "100%"}} />}
      lat={lat}
      lng={lng}
    />
  </div>
}

export default MapComponent;