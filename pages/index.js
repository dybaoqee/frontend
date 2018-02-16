import {Component} from 'react'
import Head from 'next/head'
import Link from 'next/link'

import * as colors from 'constants/colors'
import {getFeaturedListings} from 'services/listing-api'
import {getNeighborhoods} from 'services/neighborhood-api'
import {isAuthenticated} from 'lib/auth'
import Layout from 'components/main-layout'
import HomeSearch from 'components/home/search'
import HomeListings from 'components/home/listings'
import HomeTour from 'components/home/Tour'
import HomeSellingPoints from 'components/home/selling-points'
import HomeBuySell from 'components/home/BuySell'

export default class MyPage extends Component {
  static async getInitialProps(context) {
    const res = await getFeaturedListings(context.query)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return {}
    }

    if (!res.data) {
      return res
    }

    const neighborhoodResponse = await getNeighborhoods()

    if (neighborhoodResponse.data.errors) {
      this.setState({errors: neighborhoodResponse.data.errors})
      return {}
    }

    if (!neighborhoodResponse.data) {
      this.setState({errors: 'Unknown error. Please try again.'})
      return {}
    }

    return {
      listings: res.data.listings,
      authenticated: isAuthenticated(context),
      neighborhoods: neighborhoodResponse.data.neighborhoods,
      query: context.query,
    }
  }

  render() {
    const {authenticated, listings, neighborhoods} = this.props
    const seoImg =
      'http://res.cloudinary.com/emcasa/image/upload/v1517101014/emcasa-fb-2018-01-27_ntxnrz.jpg'
    const seoTitle =
      'EmCasa | Apartamentos, Casas e Imóveis à Venda no Rio de Janeiro'
    const seoDescription =
      'Encontre Apartamentos, Casas e Imóveis à Venda no Rio de Janeiro em Ipanema, Leblon, Copacabana, Botafogo, Flamengo, Lagoa e toda Zona Sul com a Emcasa, a Imobiliária Digital com exclusivo sistema de Tour Virtual em 3D, assistência jurídica, comissões reduzidas e atendimento personalizado!'

    return (
      <Layout authenticated={authenticated} renderFooter={true}>
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

        <HomeSearch neighborhoods={neighborhoods} />
        <HomeListings listings={listings} />
        <Link href={'/listings/index'} as={'/imoveis'}>
          <a>Ver mais imóveis →</a>
        </Link>
        <HomeTour />
        <HomeSellingPoints />
        <HomeBuySell />

        <style jsx>{`
          a {
            color: ${colors.blue};
            float: left;
            font-size: 20px;
            left: 50%;
            margin: 0 auto 60px;
            position: relative;
            text-align: center;
            text-decoration: none;
            transform: translateX(-50%);
          }
        `}</style>
      </Layout>
    )
  }
}
