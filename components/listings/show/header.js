import {Component} from 'react'
import Link from 'next/link'

import {mainListingImage} from 'utils/image_url'
import {desktopHeaderHeight} from 'constants/dimensions'

import {canEdit} from 'permissions/listings-permissions'

export default class ListingHeader extends Component {
  render() {
    const {listing, currentUser, handleOpenPopup, handleOpenImageGallery} = this.props
    const imgSrc = mainListingImage(listing.images)

    return (
      <header>
        <div className="open-image-gallery-overlay" onClick={handleOpenImageGallery} />

        <div className="top-right">
          {canEdit(currentUser, listing) &&
            <Link href={`/listings/edit?id=${listing.id}`} as={`/imoveis/${listing.id}/editar`}>
              <button>Editar</button>
            </Link>
          }

          <button className="green" onClick={handleOpenPopup}>
            Marcar Visita
          </button>
        </div>

        <div className="bottom-right">
          <button className="white" onClick={handleOpenImageGallery}>
            Ver Fotos
          </button>

          <button className="white">
            Ver Tour 3D
          </button>
        </div>

        <style jsx>{`
          header {
            background-color: #f0f0f0;
            background-image: url(${imgSrc});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            height: calc(100vh - ${desktopHeaderHeight + 240}px);
            position: relative;
            width: 100vw;
          }

          header > div {
            position: absolute;
            &.open-image-gallery-overlay {
              cursor: pointer;
              height: 100%;
              width: 100%;
            }
            &.bottom-right {
              bottom: 20px;
              right: 20px;
            }
            &.top-right {
              top: 20px;
              right: 20px;
            }
          }

          button {
            margin-left: 20px;
          }
        `}</style>
      </header>
    )
  }
}
