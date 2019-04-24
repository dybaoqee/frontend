import {Component} from 'react'
import ReactDOM from 'react-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHome from '@fortawesome/fontawesome-free-solid/faHome'
import Container, {AlertText} from './styles'
import GoogleMapReact from 'google-map-react'
import Text from '@emcasa/ui-dom/components/Text'
import MapMarker from 'components/shared/Map/Marker'

export default class ListingMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      maps: null,
      panorama: null,
      streetviewService: null,
      streetviewStatus: true
    }
  }

  processStreetViewService = (data, status) => {
    const {isVisible} = this.props
    const {panorama, streetviewStatus} = this.state
    const svStatus = status === 'OK'

    if (streetviewStatus !== svStatus) {
      this.setState({streetviewStatus: svStatus})
    }

    if (panorama && data){
      panorama.setPov({
        heading: 270,
        pitch: 0
      })
      panorama.setPano(data.location.pano)
      panorama.setVisible(isVisible)
    }
  }

  loadStreetView = (map, maps) => {
    const {listing, streetView} = this.props
    const {lat, lng} = listing.address

    if (streetView) {
      const streetviewService = new maps.StreetViewService()
      const panorama = new maps.StreetViewPanorama(
        ReactDOM.findDOMNode(this.refs.panorama), {
          position: {lat: lat, lng: lng},
          visible: false,
          addressControl: false,
          fullscreenControl: false
        }
      )
      map.setStreetView(panorama)
      streetviewService.getPanorama({location: {lat: lat, lng: lng}, source: maps.StreetViewSource.OUTDOOR}, this.processStreetViewService)
      this.setState({
        maps: maps,
        streetviewService: streetviewService,
        panorama: panorama
      })
    }
  }

  componentDidUpdate() {
    const {listing, streetView, isVisible} = this.props
    const {maps, streetviewService, panorama} = this.state
    const {lat, lng} = listing.address

    if (isVisible) {
      if (streetView && streetviewService) {
        streetviewService.getPanorama({location: {lat: lat, lng: lng}, source: maps.StreetViewSource.OUTDOOR}, this.processStreetViewService)
      }
    } else {
      if (panorama) {
        panorama.setVisible(isVisible)
      }
    }
  }

  render() {
    const {listing, streetView} = this.props
    const {streetviewStatus} = this.state
    const {lat, lng} = listing.address
    const text = <FontAwesomeIcon icon={faHome} />

    return (
      <Container>
        {!streetviewStatus && <AlertText><Text color="white">Não há visualização da rua para este endereço.</Text></AlertText>}
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
