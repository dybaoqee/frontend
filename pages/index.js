import { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import 'isomorphic-unfetch'

import { getListings } from '../services/listing-api'
import { getNeighborhoods } from '../services/neighborhood-api'
import { isAuthenticated } from '../lib/auth'
import Layout from '../components/main-layout'
import HomeSearch from '../components/home/search'
import HomeListings from '../components/home/listings'
import HomeSellingPoints from '../components/home/selling-points'

import { mobileMedia } from '../constants/media'

export default class MyPage extends Component {
  static async getInitialProps(context) {
    const res = await getListings(context.query)

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
      query: context.query
    }
  }

  render () {
    const { listings } = this.props

    return (
      <Layout>
        <Head>
          <title>Apartamentos à venda no Rio de Janeiro | EmCasa</title>
          <meta name="description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
          <meta property="og:description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
          <meta property="og:image" content="https://s3-sa-east-1.amazonaws.com/emcasa/listings/original/belisario-tavora.jpg"/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:title" content="Apartamentos à venda no Rio de Janeiro | EmCasa"/>
          <meta name="twitter:description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
          <meta name="twitter:image" content="https://s3-sa-east-1.amazonaws.com/emcasa/listings/original/belisario-tavora.jpg"/>
        </Head>

        <HomeSearch />
        <HomeListings listings={listings} />
        <Link href={'/listings/index'} as={'/imoveis'}>
          <a>Ver Detalhes →</a>
        </Link>
        <iframe width='100%' height='480' src="https://my.matterport.com/show/?m=SNpWfLUSZeC" frameBorder='0' allowFullScreen></iframe>
        <HomeSellingPoints />

        <style jsx>{`
          a {
            color: blue;
            float: left;
            left: 50%;
            margin: 0 auto 20px;
            position: relative;
            text-align: center;
            transform: translateX(-50%);
          }
        `}</style>
      </Layout>
    )
  }
}
