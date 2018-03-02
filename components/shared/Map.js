import {Component} from 'react'
import GoogleMapReact from 'google-map-react'

import MapMarker from 'components/shared/Map/Marker'

export default class MapContainer extends Component {
  static defaultProps = {
    center: {lat: -22.9608099, lng: -43.2096142},
    zoom: 15
  }

  render() {
    const {markers, center, zoom} = this.props

    return (
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.GOOGLE_MAPS_KEY}}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers.map((marker, i) => {
          const {lat, lng, text} = marker
          return <MapMarker key={i} lat={lat} lng={lng} text={text} />
        })}
      </GoogleMapReact>
    )
  }
}
