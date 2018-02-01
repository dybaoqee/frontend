import React from 'react'
import MediaQuery from 'react-responsive'

import {mobileMedia} from 'constants/media'

import MapContainer from 'components/map-container'

export default class ListingMap extends React.Component {
  render() {
    const {listing} = this.props

    return <div>
      <MediaQuery query="(max-width: 600px)">
        <MapContainer lat={listing.address.lat}
          lng={listing.address.lng}
          width='100vw'
          height='300px'/>
      </MediaQuery>

      <MediaQuery query="(min-width: 601px)">
        <MapContainer lat={listing.address.lat}
          lng={listing.address.lng}
          width='960px'
          height='500px'/>
      </MediaQuery>

      <style jsx>{`
        div {
          display: flex;
          justify-content: space-around;
          margin-top: 100px;
        }
      `}</style>
    </div>
  }
}
