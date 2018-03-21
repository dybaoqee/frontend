import {Component} from 'react'
import Head from 'next/head'
import Link from 'next/link'

import {getFeaturedListings} from 'services/listing-api'
import {getNeighborhoods} from 'services/neighborhood-api'
import * as colors from 'constants/colors'
import {isAuthenticated, isAdmin} from 'lib/auth'
import Layout from 'components/shared/Shell'
import HomeSearch from 'components/home/Search'
import HomeListings from 'components/shared/Listing/Feed'
import HomeTour from 'components/home/Tour'
import HomeSellingPoints from 'components/home/SellingPoints'
import HomeBuySell from 'components/home/BuySell'
import Warning from 'components/shared/Common/Warning'

export default class MyPage extends Component {
  static async getInitialProps(context) {
    const [feed, search] = await Promise.all([
      getFeaturedListings(context.query).then(({data}) => data),
      getNeighborhoods().then(({data}) => data)
    ])

    return {
      feed,
      search,
      authenticated: isAuthenticated(context),
      isAdmin: isAdmin(context)
    }
  }

  render() {
    const {authenticated, feed, search, isAdmin, url} = this.props
    const seoImg =
      'http://res.cloudinary.com/emcasa/image/upload/v1517101014/emcasa-fb-2018-01-27_ntxnrz.jpg'
    const seoTitle =
      'EmCasa | Apartamentos, Casas e Imóveis à Venda no Rio de Janeiro'
    const seoDescription =
      'Encontre Apartamentos, Casas e Imóveis à Venda no Rio de Janeiro em Ipanema, Leblon, Copacabana, Botafogo, Flamengo, Lagoa e toda Zona Sul com a Emcasa, a Imobiliária Digital com exclusivo sistema de Tour Virtual em 3D, assistência jurídica, comissões reduzidas e atendimento personalizado!'

    return (
      <Layout
        authenticated={authenticated}
        isAdmin={isAdmin}
        renderFooter={true}
      >
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
        {url.query.r && (
          <Warning green>
            <p>
              <span>Seu cadastro foi confirmado.</span>
            </p>
          </Warning>
        )}
        <HomeSearch {...search} />
        <HomeListings {...feed} />
        <Link href={'/listings/index'} as={'/imoveis'}>
          <a>Ver mais imóveis →</a>
        </Link>
        <HomeTour />
        <HomeSellingPoints />
        <HomeBuySell />

        <style jsx>{`
          a {
            color: ${colors.blue.medium};
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
