import {Component} from 'react'
import Head from 'next/head'
import {isAuthenticated, isAdmin} from 'lib/auth'
import Layout from 'components/shared/Shell'
import Topics from 'components/shared/Common/Topics'
import CallToAction from 'components/shared/Common/CallToAction'

export default class SellKnowMore extends Component {
  static async getInitialProps(context) {
    return {
      authenticated: isAuthenticated(context),
      isAdmin: isAdmin(context)
    }
  }

  render() {
    const {authenticated, isAdmin} = this.props
    const seoImg =
      'https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/home-2018-04-03_cozxd9.jpg'
    const seoTitle = 'EmCasa | Venda seu imóvel com a EmCasa'
    const seoDescription =
      'Anuncie seu Apartamento ou Casa de forma simples e transparente'

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
      </Layout>
    )
  }
}
