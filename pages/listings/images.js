import { Component } from 'react'
import { getListingImages } from '../../services/listing-images-api'

import { redirectIfNotAuthenticated, getJwt, isAuthenticated } from '../../lib/auth'

import Layout from '../../components/main-layout'

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
        <div>
          <h1>Editar Imagens</h1>

      {images && images.map((image, i) => {
        const imgUrl = process.env.REACT_APP_S3_BASE_URL + 'listings/original/' + image.filename

        return <div key={i}>
          <img src={imgUrl}/>
        </div>
      })}
        </div>
      </Layout>
    )
  }
}
