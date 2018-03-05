import {Component} from 'react'
import GoogleMapReact from 'google-map-react'

export default class MapContainer extends Component {
  static defaultProps = {
    center: {lat: -22.9608099, lng: -43.2096142},
    zoom: 15
  }

  render() {
    const {children, center, zoom} = this.props

    return (
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.GOOGLE_MAPS_KEY}}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {children}
      </GoogleMapReact>
    )
  }
}
