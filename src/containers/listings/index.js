import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchPostsIfNeeded,
  handleScroll
} from '../../modules/listings/index'

import MapContainer from "../../components/map-container"
import Listing from "../../components/listings/index/listing"

class Listings extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())

    window.addEventListener('scroll', function() {
      dispatch(handleScroll(document.documentElement.scrollTop))
    })
  }

  componentDidUnmount() {
    window.removeEventListener('scroll')
  }

  render() {
    const { index, isFetching, lockGoogleMap } = this.props
    console.log(lockGoogleMap);

    return <div className="listings">
      <h1>Compre seu Imóvel na<br/>Zona Sul do Rio de Janeiro</h1>

      {isFetching &&
        <div className="spinner"></div>}

      {index &&
        <div className={lockGoogleMap ? 'locked' : ''}>
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
  index: state.listings.index,
  lockGoogleMap: state.listings.lockGoogleMap
})

export default connect(
  mapStateToProps
)(Listings)
