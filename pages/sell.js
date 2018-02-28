import {Component} from 'react'
import Head from 'next/head'

import {isAuthenticated} from 'lib/auth'
import Layout from 'components/shared/Shell'
import TextContainer from 'components/shared/TextContainer'

class Jobs extends Component {
  static async getInitialProps(context) {
    return {
      authenticated: isAuthenticated(context)
    }
  }

  render() {
    const {authenticated} = this.props

    return (
      <Layout authenticated={authenticated} renderFooter={true}>
        <Head>
          <title>Venda Seu Imóvel | EmCasa</title>
          <meta
            name="description"
            content="Venda seu Imóvel na Zona Sul do Rio de Janeiro"
          />
          <meta
            property="og:description"
            content="Venda seu Imóvel na Zona Sul do Rio de Janeiro"
          />
          <meta
            property="og:image"
            content="https://s3-sa-east-1.amazonaws.com/emcasa/listings/original/belisario-tavora.jpg"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Venda Seu Imóvel | EmCasa" />
          <meta
            name="twitter:description"
            content="Venda seu Imóvel na Zona Sul do Rio de Janeiro"
          />
          <meta
            name="twitter:image"
            content="https://s3-sa-east-1.amazonaws.com/emcasa/listings/original/belisario-tavora.jpg"
          />
        </Head>

        <TextContainer>
          <h1>Venda seu Imóvel na EmCasa</h1>

          <p>
            Ligue para nós ou envie uma mensagem por WhatsApp: 21 99609-5399.
          </p>

          <p>
            Ou escreva para nós no{' '}
            <a href="mailto:contato@emcasa.com">contato@emcasa.com</a>.
          </p>

          <p>E um Agente EmCasa te atenderá em instantes.</p>
        </TextContainer>
      </Layout>
    )
  }
}

export default Jobs
