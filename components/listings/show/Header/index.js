import {Component} from 'react'
import Link from 'next/link'
import LikeButton from 'components/shared/Common/Buttons/Like'
import Container from './styles'
import {canEdit} from 'permissions/listings-permissions'
import {mainListingImage} from 'utils/image_url'
import {getListingImages} from 'services/listing-api'
import {Mutation} from 'react-apollo'
import {VISUALIZE_TOUR} from 'graphql/listings/mutations'
import {downloadBlob} from 'utils/file-utils'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faDownload from '@fortawesome/fontawesome-free-solid/faDownload'
import EmCasaButton from 'components/shared/Common/Buttons'

export default class ListingHeader extends Component {
  state = {
    downloadingImages: false
  }
  downloadImages = async () => {
    this.setState({downloadingImages: true})
    const {currentUser: {jwt}, listing: {id}} = this.props

    const response = await getListingImages(id, jwt)

    const blob = await response.blob()
    downloadBlob(blob, `${id}.zip`, 'application/zip')
    this.setState({downloadingImages: false})
  }

  render() {
    const {
      listing,
      currentUser,
      handleOpenImageGallery,
      handleOpen3DTour,
      favoritedListing
    } = this.props

    const {downloadingImages} = this.state

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
              {listing.images.length > 0 &&
                currentUser.admin && (
                  <EmCasaButton
                    className="download-images-btn"
                    secondary
                    disabled={downloadingImages}
                    onClick={this.downloadImages}
                  >
                    <FontAwesomeIcon icon={faDownload} />
                    {downloadingImages ? 'Aguarde...' : 'Download fotos'}
                  </EmCasaButton>
                )}
            </div>
          </Container>
        )}
      </Mutation>
    )
  }
}
