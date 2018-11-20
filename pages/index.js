import {Component, Fragment} from 'react'
import Head from 'next/head'
import HomeSearch from 'components/home/Search'
import HomeListings from 'components/shared/Listing/Feed'
import HomeTour from 'components/home/Tour'
import HomeSellingPoints from 'components/home/SellingPoints'
import HomeBuySell from 'components/home/BuySell'
import Warning from 'components/shared/Common/Warning'
import CallToAction from 'components/shared/Common/CallToAction'
import {Query} from 'react-apollo'
import {
  GET_FEATURED_LISTINGS,
  GET_NEIGHBORHOODS
} from 'graphql/listings/queries'

export default class Index extends Component {
  render() {
    const {url} = this.props
    const seoImg =
      'https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/home-2018-04-03_cozxd9.jpg'
    const seoTitle =
      'Apartamentos, Casas e Imóveis à Venda no Rio de Janeiro | EmCasa'
    const seoDescription =
      'Encontre Apartamentos, Casas e Imóveis à Venda no Rio de Janeiro em Ipanema, Leblon, Copacabana, Botafogo, Flamengo, Lagoa e toda Zona Sul com a Emcasa, a Imobiliária Digital com exclusivo sistema de Tour Virtual em 3D, assistência jurídica, comissões reduzidas e atendimento personalizado!'

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
        {url.query.r && (
          <Warning green>
            <p>
              <b>Seu cadastro foi confirmado.</b>
            </p>
          </Warning>
        )}
        <Query query={GET_NEIGHBORHOODS}>
          {({data: {neighborhoods}}) => (
            <HomeSearch neighborhoods={neighborhoods || []} />
          )}
        </Query>
        <Query query={GET_FEATURED_LISTINGS}>
          {({data: {featuredListings}, loading}) =>
            loading ? '' : <HomeListings listings={featuredListings} />
          }
        </Query>
        <CallToAction
          call="Ver mais imóveis"
          href={'/listings/index'}
          as={'/imoveis'}
        />
        <HomeTour />
        <HomeSellingPoints />
        <HomeBuySell />
      </Fragment>
    )
  }
}
