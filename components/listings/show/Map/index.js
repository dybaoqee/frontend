import {Component} from 'react'
import ReactDOM from 'react-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHome from '@fortawesome/fontawesome-free-solid/faHome'
import Container from './styles'
import GoogleMapReact from 'google-map-react'
import MapMarker from 'components/shared/Map/Marker'

export default class ListingMap extends Component {
  loadStreetView = (map, maps) => {
    const {listing, streetView} = this.props
    if (streetView) {
      const {lat, lng} = listing.address
      const panorama = new maps.StreetViewPanorama(
        ReactDOM.findDOMNode(this.refs.panorama), {
          position: {lat: lat, lng: lng},
          pov: {
            heading: 34,
            pitch: 10
          },
          visible: true
        }
      )
      map.setStreetView(panorama)
    }
  }

  render() {
    const {listing, streetView} = this.props
    const {lat, lng} = listing.address
    const text = <FontAwesomeIcon icon={faHome} />

    return (
      <Container>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.GOOGLE_MAPS_KEY,
            language: 'pt-BR',
            region: 'br'
          }}
          zoom={16}
          center={{lat, lng}}
          onGoogleApiLoaded={({ map, maps }) => this.loadStreetView(map, maps)}
          ref={'panorama'}
        >
          {!streetView && <MapMarker lat={lat} lng={lng} text={text} />}
        </GoogleMapReact>
      </Container>
    )
  }
}
