import { Component } from 'react'
import Head from 'next/head'

import { mainListingImage } from '../../utils/image_url'
import { isAuthenticated, isAdmin, getCurrentUserId } from '../../lib/auth'
import { getListings } from '../../services/listing-api'
import { getNeighborhoods } from '../../services/neighborhood-api'
import Layout from '../../components/main-layout'
import MapContainer from '../../components/map-container'
import Listing from '../../components/listings/index/listing'
import ListingsNotFound from '../../components/listings/index/not-found'
import Filter from '../../components/listings/index/filter'

import { mobileMedia } from '../../constants/media'

export default class ListingsIndex extends Component {
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
      currentUser: {
        id: getCurrentUserId(context),
        admin: isAdmin(context),
        authenticated: isAuthenticated(context)
      },
      neighborhoods: neighborhoodResponse.data.neighborhoods,
      query: context.query
    }
  }

  render() {
    const { listings, neighborhoods, currentUser, query } = this.props
    const seoImgSrc = listings.length > 0 && mainListingImage(listings[0].images)

    return (
      <Layout authenticated={currentUser.authenticated}>
        <Head>
          <title>Apartamentos à venda no Rio de Janeiro | EmCasa</title>
          <meta name="description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
          <meta property="og:description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
          <meta property="og:image" content={seoImgSrc}/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:title" content="Apartamentos à venda no Rio de Janeiro | EmCasa"/>
          <meta name="twitter:description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
          <meta name="twitter:image" content={seoImgSrc}/>
        </Head>

        <div className="listings">
          <Filter neighborhoodOptions={neighborhoods} query={query} />

          <div className="map">
            <MapContainer
              listings={listings}
              height="100%"
              width="100%"
              zoom={13}/>
          </div>

          <div className="entries-container">
            {listings.map((listing, i) => {
              return <Listing listing={listing} key={i} currentUser={currentUser} />
            })}

            {(listings.length == 0) && <ListingsNotFound />}
          </div>
        </div>

        <style jsx>{`
          .listings {
            > div {
              float: left;
              width: 60%;
              &.entries-container {
                float: right;
                margin-top: 59px;
              }
            }
          }

          .map {
            background: white;
            border-radius: 8px;
            height: calc(100vh - 178px);
            margin-left: 20px;
            overflow: hidden;
            position: fixed !important;
            top: 158px;
            width: calc(40% - 40px) !important;
          }

          @media ${mobileMedia} {
            .listings > div:first-of-type {
              display: none;
            }

            .listings > div.entries-container {
              width: 100%;
            }

            .map {
              display: none;
            }
          }
        `}</style>
      </Layout>
    )
  }
}
