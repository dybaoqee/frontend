import {Component} from 'react'
import GoogleMapReact from 'google-map-react'
import supercluster from 'points-cluster'
import _ from 'lodash'

import MapMarker from 'components/shared/Map/Marker'
import ClusterMarker from 'components/shared/Map/ClusterMarker'

function createMapOptions(maps) {
  return {
    defaultZoom: 8,
    defaultCenter: {lat: -22.9608099, lng: -43.2096142},
    maxZoom: 19,
    minZoom: 5,
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_TOP,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true
  }
}

export default class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      clusters: [],
      defaultCenter: {lat: -22.9608099, lng: -43.2096142},
      defaultZoom: 8,
      mapOptions: {
        center: {lat: -22.9608099, lng: -43.2096142},
        zoom: 8
      },
      hasAggregators: false
    }

    this.firstLoad = true
  }

  getClusters = () => {
    const {mapOptions} = this.state
    const {markers} = this.props
    const clusters = supercluster(markers, {
      minZoom: 5,
      maxZoom: 16,
      radius: 60
    })

    return clusters(mapOptions)
  }

  createClusters = (bounds) => {
    const {onChange, updateAfterApiCall} = this.props
    const clusters = this.getClusters().map(({wx, wy, numPoints, points}) => ({
      lat: wy,
      lng: wx,
      numPoints,
      id: `${numPoints}_${points[0].id}`,
      points
    }))

    const framedListings = _.flatten(
      clusters
        .filter((cluster) => cluster.numPoints === 1)
        .map((marker) => [...marker.points])
    )

    if (onChange && !updateAfterApiCall) {
      onChange(framedListings.map((listing) => listing.id), bounds)
    }

    this.setState({
      clusters: this.state.mapOptions.bounds ? clusters : [],
      hasAggregators:
        clusters.reduce(
          (prevVal, elem) => (elem.numPoints > 1 ? prevVal + 1 : prevVal),
          0
        ) > 1
    })
  }

  handleMapChange = ({center, zoom, bounds}) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds
        }
      },
      () => {
        this.createClusters(bounds)
      }
    )
  }

  onChangeListener = _.throttle(() => {
    const {onChange} = this.props
    const map = this.map
    const swLat = map
      .getBounds()
      .getSouthWest()
      .lat()
    const swLng = map
      .getBounds()
      .getSouthWest()
      .lng()
    const neLat = map
      .getBounds()
      .getNorthEast()
      .lat()
    const neLng = map
      .getBounds()
      .getNorthEast()
      .lng()

    const bounds = {
      sw: {
        lat: swLat,
        lng: swLng
      },
      ne: {
        lat: neLat,
        lng: neLng
      }
    }
    onChange([], bounds)
  }, 500)

  apiIsLoaded = (map, maps, markers) => {
    const {updateAfterApiCall, onChange} = this.props
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

      if (markers.length === 0) {
        const {mapOptions: {center}} = this.state
        map.setCenter(new maps.LatLng(center.lat, center.lng))
        map.setZoom(13)
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

  frameMarkers(markers) {
    const LatLngList = markers.map((m) => new this.maps.LatLng(m.lat, m.lng))

    const bounds = new this.maps.LatLngBounds()
    for (let i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
      bounds.extend(LatLngList[i])
    }
    this.map.fitBounds(bounds)
  }

  resetMapView = () => {
    const {mapOptions: {center}} = this.state
    this.map.setCenter(new this.maps.LatLng(center.lat, center.lng))
    this.map.setZoom(13)
  }

  render() {
    const {markers, onSelect, highlight} = this.props
    const {hasAggregators, clusters, defaultCenter, defaultZoom} = this.state

    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.GOOGLE_MAPS_KEY,
          language: 'pt-BR',
          region: 'br'
        }}
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
        options={createMapOptions}
        yesIWantToUseGoogleMapApiInternals
        onChange={this.handleMapChange}
        onGoogleApiLoaded={({map, maps}) =>
          this.apiIsLoaded(map, maps, markers)
        }
      >
        {clusters.map((item) => {
          const highlightAggregator =
            highlight &&
            item.points.filter(
              ({lat, lng}) => lat === highlight.lat && lng === highlight.lng
            ).length > 0

          if (item.numPoints === 1) {
            const highlightMarker = _.isEqual(highlight, {
              lat: item.points[0].lat,
              lng: item.points[0].lng
            })

            if (hasAggregators) {
              return (
                <ClusterMarker
                  key={item.id}
                  lat={item.lat}
                  lng={item.lng}
                  points={item.points}
                  onClick={this.frameMarkers.bind(this)}
                  highlight={highlightAggregator}
                />
              )
            }
            return (
              <MapMarker
                onSelect={onSelect}
                id={item.points[0].id}
                key={item.points[0].id}
                lat={item.points[0].lat}
                lng={item.points[0].lng}
                text={item.points[0].text}
                highlight={highlightMarker}
              />
            )
          }

          return (
            <ClusterMarker
              key={item.id}
              lat={item.lat}
              lng={item.lng}
              points={item.points}
              onClick={this.frameMarkers.bind(this)}
              highlight={highlightAggregator}
            />
          )
        })}
      </GoogleMapReact>
    )
  }
}
