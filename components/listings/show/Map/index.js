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
      panorama: null
    }
  }

  processStreetViewService = (data) => {
    const {panorama} = this.state

    if (panorama) {
      panorama.setPov({
        heading: 270,
        pitch: 0
      })
      panorama.setPano(data.location.pano)
    }
  }

  loadStreetView = (map, maps) => {
    const {listing, streetView} = this.props
    const {lat, lng} = listing.address

    if (streetView) {
      const sv = new google.maps.StreetViewService()
      const panorama = new maps.StreetViewPanorama(
        ReactDOM.findDOMNode(this.refs.panorama), {
          position: {lat: lat, lng: lng},
          visible: false,
          addressControl: false,
          fullscreenControl: false
        }
      )
      map.setStreetView(panorama)
      sv.getPanorama({location: {lat: lat, lng: lng}, source: maps.StreetViewSource.OUTDOOR}, this.processStreetViewService)
      this.setState({panorama: panorama})
    }
  }

  componentDidUpdate() {
    const {listing, isVisible, streetView} = this.props
    const {panorama} = this.state
    const {lat, lng} = listing.address

    if (streetView && panorama) {
      panorama.setPosition({lat: lat, lng: lng})
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
