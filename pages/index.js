import {Component} from 'react'
import Head from 'next/head'
import Link from 'next/link'

import * as colors from 'constants/colors'
import {isAuthenticated} from 'lib/auth'
import Layout from 'components/main-layout'
import HomeSearch from 'components/home/search'
import HomeListings from 'components/home/listings'
import HomeTour from 'components/home/Tour'
import HomeSellingPoints from 'components/home/selling-points'
import HomeBuySell from 'components/home/BuySell'

export default class MyPage extends Component {
  static async getInitialProps(context) {
    const [feed, search] = await Promise.all([
      HomeListings.getInitialProps(context),
      HomeSearch.getInitialProps(context)
    ]).catch(error => {
      const {response} = error
      if (response && response.data.errors) this.setState({
        errors: response.data.errors
      })
      else throw error
    })

    return {
      feed,
      search,
      authenticated: isAuthenticated(context)
    }
  }

  render() {
    const {authenticated} = this.props
    const seoImg =
      'http://res.cloudinary.com/emcasa/image/upload/v1517101014/emcasa-fb-2018-01-27_ntxnrz.jpg'
    const seoTitle =
      'EmCasa: Apartamentos, Casas e Imóveis à venda e para comprar ou anunciar no Rio de Janeiro'
    const seoDescription =
      'Imobiliária Digital com Tour Virtual em 3D, assistência jurídica e comissões de 3%. Encontre Imóveis, Casas e Apartamentos novos e usados para compra, venda, anuncio ou avaliação em Ipanema, Leblon, Copacabana, Botafogo, Flamengo, Lagoa e toda Zona Sul do Rio de Janeiro, RJ.'

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

        <HomeSearch {...this.props.search} />
        <HomeListings {...this.props.feed} />
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
