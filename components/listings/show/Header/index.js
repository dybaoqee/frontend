import {Component} from 'react'
import Link from 'next/link'

import Container from './styles'
import {canEdit} from 'permissions/listings-permissions'
import {mainListingImage} from 'utils/image_url'

export default class ListingHeader extends Component {
  render() {
    const {
      listing,
      currentUser,
      handleOpenPopup,
      handleOpenImageGallery,
      handleOpen3DTour
    } = this.props

    const {matterport_code, images} = listing
    const src = `https://my.matterport.com/show/?m=${matterport_code}`

    return (
      <Container>
        {matterport_code && (
          <div className="overlay" onClick={handleOpen3DTour} />
        )}

        {matterport_code ? (
          <iframe
            width="100%"
            height="400px"
            src={src}
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <div
            className="image"
            style={{backgroundImage: `url(${mainListingImage(images)})`}}
            onClick={handleOpenImageGallery}
          />
        )}

        <div className="top-right">
          {canEdit(currentUser, listing) && (
            <Link
              href={`/listings/edit?id=${listing.id}`}
              as={`/imoveis/${listing.id}/editar`}
            >
              <button>Editar</button>
            </Link>
          )}

          <button className="green" onClick={handleOpenPopup}>
            Marcar Visita
          </button>
        </div>

        <div className="bottom-right">
          {listing.matterport_code && (
            <button className="white" onClick={handleOpen3DTour}>
              Ver Tour
            </button>
          )}

          {listing.images.length > 0 && (
            <button className="white" onClick={handleOpenImageGallery}>
              Ver Fotos
            </button>
          )}
        </div>
      </Container>
    )
  }
}
