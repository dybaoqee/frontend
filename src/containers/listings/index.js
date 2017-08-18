import React, { Component } from 'react'
// import { push } from 'react-router-redux'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchPostsIfNeeded
} from '../../modules/listings/index'

class Listings extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }

  render() {
    const { index, isFetching } = this.props;

    if (isFetching) {
      return <div>Fetching listings</div>
    }

    if (index) {
      return <div>
        {index.map((listing, i) =>
          <div key={i}>
            <h1>{listing.name}</h1>
            <p><b>Preço: R${listing.price}</b></p>
            <p><b>Área: {listing.area}m²</b></p>
            <p><b>Quartos: {listing.rooms}</b></p>
            <p>{listing.description}</p>
          </div>
        )}
      </div>
    } else {
      return <div>&nbps;</div>
    }
  }
}

const mapStateToProps = state => ({
  isFetching: state.listings.isFetching,
  index: state.listings.index
})

// const mapDispatchToProps = dispatch => bindActionCreators({
//   fetchPostsIfNeeded,
//   changePage: () => push('/listings')
// }, dispatch)

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Listings)
