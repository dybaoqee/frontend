import {Component} from 'react'
import Head from 'next/head'

import {mainListingImage} from 'utils/image_url'

export default class ListingHead extends Component {
  render() {
    const {listing} = this.props
    const seoImgSrc = mainListingImage(listing.images)

    return (
      <Head>
        <title>
          À venda: {listing.type} - {listing.address.street} -{' '}
          {listing.address.neighborhood}, {listing.address.city} | EmCasa
        </title>
        <meta name="description" content={listing.description} />
        <meta property="og:description" content={listing.description} />
        <meta property="og:image" content={seoImgSrc} />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="768" />
      </Head>
    )
  }
}
