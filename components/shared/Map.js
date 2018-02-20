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
    const {children, height, width, lat, lng, zoom} = this.props
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
        {children}
      </Gmaps>
    )
  }
}

export {Marker}
