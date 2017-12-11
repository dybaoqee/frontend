import React from 'react'
import NumberFormat from 'react-number-format'

import { mobileMedia  } from '../../../constants/media'

class ImageContainer extends React.Component {
  render() {
    const { listing } = this.props
    const bgImg = (listing.images.length > 0) ? listing.images[0].filename : 'default.jpg'
    const bgImgUrl = process.env.REACT_APP_S3_BASE_URL + 'listings/small/' + bgImg
    const divStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0) 50%, rgba(0, 0, 0, 0.7) 80%), url(${bgImgUrl})`
    }

    return (
      <div className="image-container" style={divStyle}>
        <div>
          <span><NumberFormat value={listing.price} displayType={'text'} thousandSeparator={'.'} prefix={'R$'} decimalSeparator={','} /></span>
          <span className="address">
            {listing.address.street}
          </span>
          <span className="neighborhood">
            {listing.address.neighborhood}, {listing.address.city}
          </span>
        </div>

      <style jsx>{`
        .image-container {
          background-position: center;
          background-size: cover;
          float: left;
          height: 200px;
          position: relative;
          width: 300px;
        }

        .image-container div {
          bottom: 10px;
          color: white;
          left: 10px;
          position: absolute;
        }

        .image-container div span {
          clear: both;
          display: block;
          font-size: 18px;
        }

        .image-container div span.address {
          font-size: 13px;
          margin-bottom: 1px;
          margin-top: 3px;
        }

        .image-container div span.neighborhood {
          font-size: 10px;
        }

        @media ${mobileMedia} {
          .image-container {
            width: 100%;
          }
        }
      `}</style>
      </div>
    )
  }
}

export default ImageContainer
