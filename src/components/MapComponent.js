import React from 'react'
import {compose, withProps } from 'recompose'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

const MapComponent = withScriptjs(withGoogleMap(({isMarkerShown, lat, lng}) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: lat, lng: lng }}
  >
    {isMarkerShown && <Marker position={{ lat: lat, lng: lng }} />}
  </GoogleMap>
))

export default MapComponent