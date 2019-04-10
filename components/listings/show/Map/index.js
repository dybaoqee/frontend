import {Component} from 'react'
import ReactDOM from 'react-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHome from '@fortawesome/fontawesome-free-solid/faHome'
import Container from './styles'
import GoogleMapReact from 'google-map-react'
import MapMarker from 'components/shared/Map/Marker'

export default class ListingMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      maps: null
    }
  }

  loadStreetView = (map, maps) => {
    const {listing, streetView} = this.props
    if (streetView) {
      const {lat, lng} = listing.address
      const panorama = new maps.StreetViewPanorama(
        ReactDOM.findDOMNode(this.refs.panorama), {
          position: {lat: lat, lng: lng},
          visible: false,
          addressControl: false,
          fullscreenControl: false
        }
      )
      map.setStreetView(panorama)
    }

    this.setState({
      map: map,
      maps: maps
    })
  }

  componentDidUpdate() {
    const {isVisible, streetView} = this.props
    const {map, maps} = this.state
    if (streetView && map && maps) {
      const panorama = map.getStreetView()
      panorama.setVisible(isVisible)
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
          {!streetView && <MapMarker lat={lat.toString()} lng={lng.toString()} text={text} />}
        </GoogleMapReact>
      </Container>
    )
  }
}
