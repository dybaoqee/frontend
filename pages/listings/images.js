import { Component } from 'react'
import update from 'immutability-helper'
import { getListingImages, reorderImages } from '../../services/listing-images-api'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { redirectIfNotAuthenticated, getJwt, isAuthenticated } from '../../lib/auth'

import Layout from '../../components/main-layout'
import TextContainer from '../../components/text-container'
import DraggableImage from '../../components/listings/listing/images/image'

@DragDropContext(HTML5Backend)
export default class ListingImages extends Component {
  constructor(props) {
    super(props)
    this.state = { images: this.props.images }
  }

  static async getInitialProps(context) {
    if (redirectIfNotAuthenticated(context)) {
      return {}
    }

    const jwt = getJwt(context)
    const { listingId } = context.query

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
      authenticated: isAuthenticated(context)
    }
  }

  moveImage = async (dragIndex, hoverIndex) => {
    const { images } = this.state
    const { listingId, jwt } = this.props
    const dragImage = images[dragIndex]

    this.setState(
      update(this.state, {
        images: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragImage]],
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

  render() {
    const { listingId, authenticated } = this.props
    const { images } = this.state

    return (
      <Layout authenticated={authenticated}>
        <TextContainer>
          <h1>Editar Imagens</h1>

          <div className="images-container">
            {images && images.map((image, i) => {
              return <DraggableImage
                image={image}
                key={image.id}
                index={i}
                moveImage={this.moveImage}/>
            })}
          </div>
        </TextContainer>
        <style jsx>{`
          .images-container {
            background: #eee;
          }
        `}</style>
      </Layout>
    )
  }
}
