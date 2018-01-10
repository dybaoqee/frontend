import { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import 'isomorphic-unfetch'

import { mainListingImage } from '../utils/image_url'
import { isAuthenticated } from '../lib/auth'
import { getListings } from '../services/listing-api'
import { getNeighborhoods } from '../services/neighborhood-api'
import Layout from '../components/main-layout'
import MapContainer from '../components/map-container'
import Listing from '../components/listings/index/listing'
import Filter from '../components/listings/index/filter'

import { mobileMedia } from '../constants/media'

export default class MyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lockGoogleMap: false
    }
  }

  static async getInitialProps(context) {
    return {}
  }

  render () {

    return (
      <Layout>
        <Head>
          <title>Apartamentos à venda no Rio de Janeiro | EmCasa</title>
          <meta name="description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
          <meta property="og:description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
          <meta property="og:image" content={seoImgSrc}/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:title" content="Apartamentos à venda no Rio de Janeiro | EmCasa"/>
          <meta name="twitter:description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
        </Head>

        <div className="listings">
          <h1>Nova Home Page - Aguarde</h1>
        </div>

        <style jsx>{`
          .listings {
            h1 {
              line-height: 1.2em;
              margin-bottom: 40px;
              text-align: center;
            }
          }
        `}</style>
      </Layout>
    )
  }
}
