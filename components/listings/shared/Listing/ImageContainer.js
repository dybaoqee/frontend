import React from 'react'
import {ImageContainer as Image} from './styles'

import {mainListingThumbnail} from 'utils/image_url'

class ImageContainer extends React.Component {
  render() {
    const {listing, resumedInfo} = this.props
    const bgImgUrl = mainListingThumbnail(listing.images || [])
    const divStyle = {
      backgroundImage: `url(${bgImgUrl})`
    }
    return <Image style={divStyle} resumedInfo={resumedInfo} />
  }
}

export default ImageContainer
