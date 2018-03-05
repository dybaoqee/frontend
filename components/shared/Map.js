import {Component} from 'react'
import GoogleMapReact from 'google-map-react'

import MapMarker from 'components/shared/Map/Marker'

export default class MapContainer extends Component {
  static defaultProps = {
    center: {lat: -22.9608099, lng: -43.2096142},
    zoom: 15,
    markers: []
  }

  render() {
    const {markers, center, zoom, onSelect} = this.props

    return (
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.GOOGLE_MAPS_KEY}}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers.map((marker) => {
          const {id, lat, lng, text} = marker
          return (
            <MapMarker
              onSelect={onSelect}
              id={id}
              key={id}
              lat={lat}
              lng={lng}
              text={text}
            />
          )
        })}
      </GoogleMapReact>
    )
  }
}
