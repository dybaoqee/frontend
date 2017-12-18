import { Component } from 'react'
import { getListingImages } from '../../services/listing-images-api'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { redirectIfNotAuthenticated, getJwt, isAuthenticated } from '../../lib/auth'

import Layout from '../../components/main-layout'
import TextContainer from '../../components/text-container'
import DraggableImage from '../../components/listings/listing/images/image'

@DragDropContext(HTML5Backend)
export default class ListingImages extends Component {
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

  render() {
    const { listingId, images, authenticated } = this.props

    return (
      <Layout authenticated={authenticated}>
        <TextContainer>
          <h1>Editar Imagens</h1>

          <div className="images-container">
            {images && images.map((image, i) => {
              return <DraggableImage image={image} />
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
