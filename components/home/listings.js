import { Component } from 'react'
import Link from 'next/link'
import NumberFormat from 'react-number-format'

import * as colors from '../../constants/colors'
import { mainListingThumbnail } from '../../utils/image_url'

export default class HomeListings extends Component {
  render() {
    const { listings } = this.props
    const numberOfListingsToShow = 4

    return <div className="container">
      {listings.slice(0, numberOfListingsToShow).map(function(listing) {
        const imgUrl = mainListingThumbnail(listing.images)
        const imgStyle = { backgroundImage: `url(${imgUrl})` }

        return <Link href={`/listings/show?id=${listing.id}`}
                     as={`/imoveis/${listing.id}`}
                     key={listing.id}>
          <div className="listing" >
            <div className="image-container" style={imgStyle}/>
            <p className="price">
              <NumberFormat value={listing.price}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            prefix={'R$'}
                            decimalSeparator={','} />
            </p>
            <p className="street">{listing.address.street}</p>
            <p className="neighborhood">{listing.address.neighborhood}</p>
          </div>
        </Link>
      })}

      <style jsx>{`
        div.container {
          display: flex;
          justify-content: space-between;
          margin: 0 auto;
          padding: 60px 0;
          width: 1180px;
        }

        div.listing {
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          float: left;
          font-size: 20px;
          height: 300px;
          overflow: hidden;
          width: 282px;
          &:hover {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
          }

          p {
            clear: both;
            float: left;
            margin: 0 20px;
            &.price {
              font-size: 24px;
              font-weight: 300;
              margin-top: 18px;
            }
              &.street {
                color: ${colors.mediumDarkGray};
                font-size: 14px;
                margin-bottom: 4px;
                margin-top: 2px;
              }
              &.neighborhood {
                color: ${colors.mediumDarkGray};
                font-size: 14px;
                text-transform: uppercase;
              }
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
