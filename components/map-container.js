import {Component} from 'react'
import {Gmaps, Marker} from 'react-gmaps'

const params = {v: '3.exp', key: 'AIzaSyDmYQLTPwsDPtErGWTgiejz17QCw39MEVQ'}

export default class MapContainer extends Component {
  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true,
    })
  }

  render() {
    const {height, width, lat, lng, listings, zoom} = this.props
    const defaultZoom = 15

    return (
      <Gmaps
        width={width}
        height={height}
        lat={lat ? lat : '-22.9608099'}
        lng={lng ? lng : '-43.2096142'}
        zoom={zoom || defaultZoom}
        loadingMessage={' '}
        params={params}
      >
        <Marker lat={lat} lng={lng} />

        {listings &&
          listings.map((listing, i) => {
            return (
              <Marker
                key={i}
                lat={listing.address.lat}
                lng={listing.address.lng}
              />
            )
          })}
      </Gmaps>
    )
  }
}
