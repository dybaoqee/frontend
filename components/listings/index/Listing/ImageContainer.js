import React from 'react'
import {LikeContainer, ImageContainer as Image, ListingInfo} from './styles'
import LikeButton from 'components/shared/Common/Buttons/Like'
import NumberFormat from 'react-number-format'

import {mainListingThumbnail} from 'utils/image_url'

class ImageContainer extends React.Component {
  render() {
    const {
      listing,
      favorite,
      currentUser,
      loading,
      mapOpenedOnMobile
    } = this.props
    const bgImgUrl = mainListingThumbnail(listing.images || [])
    const divStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0) 50%, rgba(0, 0, 0, 0.7) 80%), url(${bgImgUrl})`
    }
    return (
      <Image style={divStyle} mapOpenedOnMobile={mapOpenedOnMobile}>
        {!loading && (
          <LikeContainer mapOpenedOnMobile={mapOpenedOnMobile}>
            <LikeButton
              favorite={favorite}
              listing={listing}
              user={currentUser}
            />
          </LikeContainer>
        )}
        <ListingInfo mapOpenedOnMobile={mapOpenedOnMobile}>
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
        </ListingInfo>
      </Image>
    )
  }
}

export default ImageContainer
