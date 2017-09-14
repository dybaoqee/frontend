import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchListingIfNeeded
} from '../../modules/listings/show'

class Listings extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(fetchListingIfNeeded(id));
  }

  render() {
    const { isFetching, listing } = this.props

    if (isFetching) {
      return <div>Fetching listing</div>
    } else if (listing.listing) {
      return <div className="listings">
        <h1>{listing.listing.rooms}</h1>
        <img src="http://www.mapaplan.com/seating-plan/wembley-stadium-chart-london/high-resolution/wembley-stadium-london-seating-plan-09-google-map-high-resolution.jpg" alt="Map"/>
      </div>
    }

    return <div>&nbsp;</div>
  }
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  isFetching: state.listing.isFetching,
  listing: state.listing
})

export default connect(
  mapStateToProps
)(Listings)
