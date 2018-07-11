import React from 'react'
import {LikeContainer, ImageContainer as Image} from './styles'
import LikeButton from 'components/shared/Common/Buttons/Like'

import {mainListingThumbnail} from 'utils/image_url'

class ImageContainer extends React.Component {
  render() {
    const {listing, favorite, currentUser, loading, resumedInfo} = this.props
    const bgImgUrl = mainListingThumbnail(listing.images || [])
    const divStyle = {
      backgroundImage: `url(${bgImgUrl})`
    }
    return (
      <Image style={divStyle} resumedInfo={resumedInfo}>
        {!loading && (
          <LikeContainer resumedInfo={resumedInfo}>
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
