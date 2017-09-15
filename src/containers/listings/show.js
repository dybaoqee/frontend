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
    const { listing } = this.props.listing

    if (!listing) {
      return <div>Fetching listing</div>
    }

    return <div className="listing">
      <header>
        <div>
          <div>
            <h6>Apartamento</h6>
            <p>{listing.address.street}, {listing.address.street_number}</p>
            <p>
              {listing.address.neighborhood}, {listing.address.city}
            </p>
          </div>
          <div>
            R${listing.price}
          </div>
        </div>

        <button className="green">
          Marcar Visita
        </button>
      </header>
      <img src="http://www.mapaplan.com/seating-plan/wembley-stadium-chart-london/high-resolution/wembley-stadium-london-seating-plan-09-google-map-high-resolution.jpg" alt="Map"/>
    </div>
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
