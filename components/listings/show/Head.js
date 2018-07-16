import {Component} from 'react'
import Head from 'next/head'

import {mainListingImage} from 'utils/image_url'

export default class ListingHead extends Component {
  render() {
    const {listing} = this.props
    const seoImgSrc = mainListingImage(listing.images)

    const description = `Conheça ${
      listing.matterportCode ? 'com Tour Virtual 3D' : ''
    } ${listing.type.charAt(listing.type.length - 1)} ${listing.type} na ${
      listing.address.street
    }, ${listing.address.neighborhood}, ${listing.address.city} - ${
      listing.rooms
    } dormitórios, ${
      listing.area
    } metros quadrados, R$ ${listing.price.toLocaleString('pt-BR')},00 - ID${
      listing.id
    }`

    return (
      <Head>
        <title>
          {listing.type} à venda na {listing.address.street} -{' '}
          {listing.address.neighborhood}, {listing.address.city} - ID{
            listing.id
          }{' '}
          | EmCasa
        </title>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={seoImgSrc} />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="768" />
      </Head>
    )
  }
}
