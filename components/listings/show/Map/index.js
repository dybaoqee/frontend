import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHome from '@fortawesome/fontawesome-free-solid/faHome'
import Container from './styles'
import GoogleMapReact from 'google-map-react'
import MapMarker from 'components/shared/Map/Marker'

export default class ListingMap extends React.Component {
  render() {
    const {listing} = this.props
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
        >
          <MapMarker lat={lat} lng={lng} text={text} />
        </GoogleMapReact>
      </Container>
    )
  }
}
