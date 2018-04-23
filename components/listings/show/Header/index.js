import {Component} from 'react'
import Link from 'next/link'
import LikeButton from 'components/shared/Common/Buttons/Like'
import Container from './styles'
import {canEdit} from 'permissions/listings-permissions'
import {mainListingImage} from 'utils/image_url'
import {Mutation} from 'react-apollo'
import {VISUALIZE_TOUR} from 'graphql/listings/mutations'

export default class ListingHeader extends Component {
  render() {
    const {
      listing,
      currentUser,
      handleOpenImageGallery,
      handleOpen3DTour,
      favoritedListing
    } = this.props

    const {matterport_code, images} = listing
    const src = `https://my.matterport.com/show/?m=${matterport_code}`
    return (
      <Mutation mutation={VISUALIZE_TOUR}>
        {(visualizeTour) => (
          <Container>
            {matterport_code && (
              <div
                className="overlay"
                onClick={() => {
                  visualizeTour({variables: {id: listing.id}})
                  handleOpen3DTour()
                }}
              />
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

              {!favoritedListing.loading && (
                <LikeButton
                  favorite={favoritedListing.favorite}
                  listing={listing}
                  user={currentUser}
                />
              )}
            </div>

            <div className="bottom-right">
              {listing.matterport_code && (
                <button
                  className="white"
                  onClick={() => {
                    visualizeTour({variables: {id: listing.id}})
                    handleOpen3DTour()
                  }}
                >
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
        )}
      </Mutation>
    )
  }
}
