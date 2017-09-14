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
    const { isFetching, id } = this.props;

    if (isFetching) {
      return <div>Fetching listing</div>
    }

    return <div className="listing">
      <header>
        <h6>Apartamento</h6>

      </header>
      <img src="http://www.mapaplan.com/seating-plan/wembley-stadium-chart-london/high-resolution/wembley-stadium-london-seating-plan-09-google-map-high-resolution.jpg" alt="Map"/>
    </div>
  }
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  isFetching: state.listings.isFetching
})

export default connect(
  mapStateToProps
)(Listings)
