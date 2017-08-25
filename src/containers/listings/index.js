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
      return <div className="listings">
        <img src="http://www.mapaplan.com/seating-plan/wembley-stadium-chart-london/high-resolution/wembley-stadium-london-seating-plan-09-google-map-high-resolution.jpg" alt="Map"/>

        <div>
          {index.map((listing, i) => {
            const bgImgUrl = 'http://www.judicearaujo.com.br/imoveis/010420141931256rjkwb.jpg'
            var divStyle = {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0) 50%, rgba(0, 0, 0, 0.7) 80%), url(${bgImgUrl})`
            }

            return <div className="listing" key={i}>
              <div style={divStyle}>
                <div>
                  <span>R${listing.price}</span>
                  <span>{listing.address.street}</span>
                  <span>
                    {listing.address.neighborhood}, {listing.address.city}
                  </span>
                </div>
              </div>

              <div>
                <p>{listing.description}</p>
                <p><b>Área: {listing.area}m²</b></p>
                <p><b>Quartos: {listing.rooms}</b></p>
                <p><b>Vagas de garagem: {listing.garage_spots}</b></p>
              </div>
            </div>
          })}
        </div>
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
