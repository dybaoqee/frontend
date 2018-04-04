import {Component} from 'react'
import Head from 'next/head'
import {getFeaturedListings} from 'services/listing-api'
import {getNeighborhoods} from 'services/neighborhood-api'
import {isAuthenticated, isAdmin} from 'lib/auth'
import Layout from 'components/shared/Shell'
import HomeSearch from 'components/home/Search'
import HomeListings from 'components/shared/Listing/Feed'
import HomeTour from 'components/home/Tour'
import HomeSellingPoints from 'components/home/SellingPoints'
import HomeBuySell from 'components/home/BuySell'
import Warning from 'components/shared/Common/Warning'
import Topics from 'components/shared/Common/Topics'
import CallToAction from 'components/shared/Common/CallToAction'

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
              <b>Seu cadastro foi confirmado.</b>
            </p>
          </Warning>
        )}
        <HomeSearch {...search} />
        <HomeListings {...feed} />
        <CallToAction
          call="Ver mais imóveis"
          href={'/listings/index'}
          as={'/imoveis'}
        />
        <Topics title="Venda seu imóvel" showNumbers>
          <p>
            Anuncie seu imóvel por apenas 3% do valor da venda. Os clientes
            EmCasa poupam, em média, R$20mil e a gente só recebe a comissão
            quando você recebe o valor da venda.
          </p>
          <p>
            O tour virtual permite fazer mais visitas, ocupando menos tempo e
            com mais segurança. Venda seu imóvel mais rápido! - "Vendi meu
            imóvel em 12 dias com a EmCasa" - Graciano
          </p>
          <p>
            Tenha assistência jurídica no processo inteiro (documentação,
            financiamento, FGTS) sem pagar mais por isso
          </p>
        </Topics>
        <CallToAction
          call="Vender imóvel"
          href={'/listings/new'}
          as={'/imoveis/adicionar'}
        />
        <HomeTour />
        <HomeSellingPoints />
        <HomeBuySell />
      </Layout>
    )
  }
}
