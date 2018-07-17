import {Component, Fragment} from 'react'
import Link from 'next/link'
import update from 'immutability-helper'
import {
  getListingImages,
  reorderImages,
  createImage
} from 'services/listing-images-api'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import {redirectIfNotAuthenticated, getJwt} from 'lib/auth'
import DraggableImage from 'components/listings/show/images/DraggableImage'
import ImageUpload from 'components/listings/show/images/Upload'
import ImagesContainer, {
  ImagePlaceholder,
  Container
} from 'components/listings/show/images/styles'

import {Header} from 'components/listings/shared/styles'

@DragDropContext(HTML5Backend)
export default class ListingImages extends Component {
  constructor(props) {
    super(props)
    this.state = {images: this.props.images}
  }

  static async getInitialProps(context) {
    if (redirectIfNotAuthenticated(context)) {
      return {}
    }

    const jwt = getJwt(context)
    const {listingId} = context.query

    const res = await getListingImages(listingId, jwt)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return {}
    }

    if (!res.data) {
      return res
    }

    return {
      listingId,
      jwt,
      images: res.data.images,
      renderFooter: false
    }
  }

  moveImage = async (dragIndex, hoverIndex) => {
    const {images} = this.state
    const {listingId, jwt} = this.props
    const dragImage = images[dragIndex]

    this.setState(
      update(this.state, {
        images: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragImage]]
        }
      })
    )

    const orderForApi = this.state.images.map((image, i) => {
      return {position: i, id: image.id}
    })

    const res = await reorderImages(listingId, orderForApi, jwt)
    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return {}
    }

    if (!res.data) {
      return res
    }
  }

  onImageUploaded = async (response) => {
    const {listingId, jwt} = this.props
    const filename = response.body.public_id + '.' + response.body.format

    const res = await createImage(listingId, filename, jwt)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return {}
    }

    if (!res.data) {
      return res
    }

    const newImage = res.data.image
    this.setState(
      update(this.state, {
        images: {
          $unshift: [newImage]
        }
      })
    )
  }

  onImageDeleted = async (image) => {
    this.setState({
      images: update(this.state.images, {
        $splice: [[image.index, 1]]
      })
    })
  }

  render() {
    const {listingId, jwt} = this.props
    const {images} = this.state

    return (
      <Container>
        <Header>
          <h1>Editar Imagens</h1>
          <Link
            href={`/listings/edit?id=${listingId}`}
            as={`/imoveis/${listingId}/editar`}
          >
            <a>Editar Imóvel</a>
          </Link>
        </Header>

        {images.length === 0 ? (
          <ImageUpload onImageUploaded={this.onImageUploaded} />
        ) : (
          <Fragment>
            <p>Clique e arraste para reordenar as imagens do imóvel</p>
            <ImageUpload onImageUploaded={this.onImageUploaded}>
              <ImagePlaceholder>
                <span>+</span>
                <p>Adicionar fotos</p>
              </ImagePlaceholder>
            </ImageUpload>
            <ImagesContainer>
              {images &&
                images.map((image, i) => {
                  return (
                    <DraggableImage
                      listingId={listingId}
                      image={image}
                      key={image.id}
                      index={i}
                      jwt={jwt}
                      onImageDeleted={this.onImageDeleted}
                      moveImage={this.moveImage}
                    />
                  )
                })}
            </ImagesContainer>
          </Fragment>
        )}
      </Container>
    )
  }
}
