import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchPostsIfNeeded
} from '../../modules/listings/index'

import Listing from "../../components/listings/index/listing"

class Listings extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  render() {
    const { index, isFetching } = this.props

    const varImg = {
      backgroundImage: 'url(/mapa-leblon.jpg)'
    }

    return <div className="listings">
      <h1>Seja feliz procurando sua casa nova</h1>
      <h2>Veja os melhores apartamentos à venda na Zona Sul do Rio de Janeiro</h2>

      {isFetching &&
        <div>Fetching listings</div>}

      {index &&
        <div>
          <div className="map-container" style={varImg}>
            &nbsp;
          </div>

          <div className="entries-container">
            {index.map((listing, i) => {
              return <Listing listing={listing} i={i} />
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
