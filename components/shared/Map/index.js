import {Component} from 'react'
import GoogleMapReact from 'google-map-react'
import _ from 'lodash'

import MapMarker from 'components/shared/Map/Marker'

export default class MapContainer extends Component {
  static defaultProps = {
    center: {lat: -22.9608099, lng: -43.2096142},
    zoom: 15,
    markers: []
  }

  constructor(props) {
    super(props)
  }

  apiIsLoaded = (map, maps, markers) => {
    if (map) {
      this.map = map
      this.maps = maps
      const LatLngList = markers.map((m) => new maps.LatLng(m.lat, m.lng))

      const bounds = new maps.LatLngBounds()
      for (let i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
        bounds.extend(LatLngList[i])
      }
      map.fitBounds(bounds)

      if (markers.length === 1) {
        map.setZoom(15)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const {markers} = nextProps
    const {markers: prevMarkers} = this.props
    if (!_.isEqual(markers, prevMarkers)) {
      this.apiIsLoaded(this.map, this.maps, markers)
    }
  }

  render() {
    const {markers, center, zoom, onSelect, highlight} = this.props

    return (
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.GOOGLE_MAPS_KEY}}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map, maps}) =>
          this.apiIsLoaded(map, maps, markers, true)
        }
      >
        {markers.map((marker) => {
          const {id, lat, lng, text} = marker
          const highlightMarker = _.isEqual(highlight, {lat, lng})
          return (
            <MapMarker
              onSelect={onSelect}
              id={id}
              key={id}
              lat={lat}
              lng={lng}
              text={text}
              highlight={highlightMarker}
            />
          )
        })}
      </GoogleMapReact>
    )
  }
}
