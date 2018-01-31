import { Component } from 'react'
import Link from 'next/link'

import {desktopHeaderHeight} from 'constants/dimensions'
import { mobileMedia } from 'constants/media'
import { canEdit }  from 'permissions/listings-permissions'

import ImageGallery from 'components/listings/show/image-gallery'

class ListingHeader extends Component {
  render() {
    const { listing, currentUser } = this.props

    return (
      <header>
        <style jsx>{`
          header {
            background: pink;
            height: calc(100vh - ${desktopHeaderHeight + 240}px);
            width: 100vw;
          }
        `}</style>
      </header>
    )
  }
}

export default ListingHeader
