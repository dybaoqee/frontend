import React from 'react'
import {LikeContainer, ImageContainer as Image} from './styles'
import LikeButton from 'components/shared/Common/Buttons/Like'

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
      </Image>
    )
  }
}

export default ImageContainer
