import React from 'react'
import {LikeContainer} from './styles'
import LikeButton from 'components/shared/Common/Buttons/Like'
import NumberFormat from 'react-number-format'

import {mainListingThumbnail} from 'utils/image_url'
import {mobileMedia} from 'constants/media'

class ImageContainer extends React.Component {
  render() {
    const {listing, favorite, currentUser, loading} = this.props
    const bgImgUrl = mainListingThumbnail(listing.images)
    const divStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0) 50%, rgba(0, 0, 0, 0.7) 80%), url(${bgImgUrl})`
    }
    return (
      <div className="image-container" style={divStyle}>
        {currentUser.authenticated &&
          !loading && (
            <LikeContainer>
              <LikeButton favorite={favorite} listing={listing} />
            </LikeContainer>
          )}
        <div>
          <span>
            <NumberFormat
              value={listing.price}
              displayType={'text'}
              thousandSeparator={'.'}
              prefix={'R$'}
              decimalSeparator={','}
            />
          </span>
          <span className="address">{listing.address.street}</span>
          <span className="neighborhood">
            {listing.address.neighborhood}, {listing.address.city}
          </span>
        </div>

        <style jsx>{`
          .image-container {
            background-position: center;
            background-size: cover;
            border-radius: 8px;
            float: left;
            height: 200px;
            margin-left: 10px;
            position: relative;
            width: 290px;
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
              width: calc(100% - 20px);
            }
          }
        `}</style>
      </div>
    )
  }
}

export default ImageContainer
