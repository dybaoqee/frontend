import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchPostsIfNeeded
} from '../../modules/listings/index'

import MapContainer from "../../components/map-container"
import Listing from "../../components/listings/index/listing"

class Listings extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  render() {
    const { index, isFetching } = this.props

    return <div className="listings">
      <h1>Compre seu imóvel na<br/>Zona Sul do Rio de Janeiro</h1>

      {isFetching &&
        <div>Fetching listings</div>}

      {index &&
        <div>
          <MapContainer
            listings={index}
            height="calc(100vh - 50px)"
            width="50%"/>

          <div className="entries-container">
            {index.map((listing, i) => {
              return <Listing listing={listing} key={i} />
            })}
          </div>
        </div>
      }
    </div>
  }
}

const mapStateToProps = state => ({
  isFetching: state.listings.isFetching,
  index: state.listings.index
})

export default connect(
  mapStateToProps
)(Listings)
