import { Component } from 'react'
import { getListingImages } from '../../services/listing-images-api'

import { redirectIfNotAuthenticated, getJwt, isAuthenticated } from '../../lib/auth'

import Layout from '../../components/main-layout'
import TextContainer from '../../components/text-container'

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
              const imgUrl = process.env.REACT_APP_S3_BASE_URL + 'listings/original/' + image.filename
              const imgStyle = { backgroundImage: `url(${imgUrl})` }

              return <div key={i}>
                <div className="image-container"
                     style={ imgStyle }>
                </div>
              </div>
            })}
          </div>
        </TextContainer>
        <style jsx>{`
          .images-container {
            background: #eee;
            display: flex;
            flex-wrap: wrap;
            > div {
              height: 200px;
              width: 200px;

              > .image-container {
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                width: 100%;
                height: 140px;
              }

              img {
                max-width: 100%;
              }
            }
          }
        `}</style>
      </Layout>
    )
  }
}
