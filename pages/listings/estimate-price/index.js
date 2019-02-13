import {Component, Fragment} from 'react'
import Head from 'next/head'
import {imageUrl} from 'utils/image_url'
import Container, {Header} from './styles'

import PriceEstimate from 'components/shared/PriceEstimate'

export default class EstimatePrice extends Component {
  render() {
    const seoImg = imageUrl(
      'emcasa-saiba-mais-para-vender-share-centered-2'
    )
    const seoTitle = 'Avalie seu imóvel no Rio de Janeiro | EmCasa'
    const seoDescription =
      'Avalie seu imóvel no Rio de Janeiro de forma simples e transparente com a EmCasa que tem sistema exclusivo de Tour Virtual 3D para aumentar suas chances de venda'

    return (
      <Fragment>
        <Head>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:image" content={seoImg} />
          <meta property="og:image:height" content="838" />
          <meta property="og:image:width" content="1476" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seoTitle} />
          <meta name="twitter:description" content={seoDescription} />
          <meta name="twitter:image" content={seoImg} />
        </Head>
        <Fragment>
          <Header>
            <img
              src={imageUrl('listings_new_header')}
              alt="Avalie seu imóvel na EmCasa"
            />
            <h1>Avalie seu imóvel no Rio de Janeiro com a EmCasa</h1>
          </Header>

          <Container id="precificador">
            <PriceEstimate />
          </Container>
        </Fragment>
      </Fragment>
    )
  }
}
