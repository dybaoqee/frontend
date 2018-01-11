import { Component } from 'react'
import NumberFormat from 'react-number-format'

import { mainListingThumbnail } from '../../utils/image_url'

export default class HomeListings extends Component {
  render() {
    const { listings } = this.props
    return <div className="container">
      {listings.map(function(listing) {
        const imgUrl = mainListingThumbnail(listing.images)
        const imgStyle = { backgroundImage: `url(${imgUrl})` }
        return <div className="listing" key={listing.id}>
          <div className="image-container" style={imgStyle}/>
          <NumberFormat value={listing.price} displayType={'text'} thousandSeparator={'.'} prefix={'R$'} decimalSeparator={','} />
          <p>{listing.address.street}</p>
          <p>{listing.address.neighborhood}</p>
        </div>
      })}
      <style jsx>{`
        div.container {
          display: flex;
          justify-content: space-between;
          margin: 0 auto;
          padding: 60px 0;
          width: 960px;
        }

        div.listing {
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          float: left;
          font-size: 20px;
          height: 300px;
          overflow: hidden;
          width: 282px;
          > :global(span, p) {
            clear: both;
            float: left;
          }

          p {
            margin: 0 0 0 10px;
          }
        }

        div.image-container {
          background-position: center;
          background-size: cover;
          height: 180px;
          width: 100%;
        }

      `}</style>
    </div>
  }
}
