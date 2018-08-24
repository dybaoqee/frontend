import {Component} from 'react'
import Head from 'next/head'

import {mainListingImage} from 'utils/image_url'

export default class ListingHead extends Component {
  render() {
    const {
      listing: {matterportCode, type, images, address, rooms, area, price, id}
    } = this.props
    const seoImgSrc = mainListingImage(images)

    const description = `Conheça ${
      matterportCode ? 'com Tour Virtual 3D' : ''
    } ${type.charAt(type.length - 1)} ${type} na ${address.street}, ${
      address.neighborhood
    }, ${address.city} - ${rooms} dormitórios, ${area} metros quadrados, R$ ${
      price ? price.toLocaleString('pt-BR') : 0
    },00 - ID${id}`

    return (
      <Head>
        <title>
          {type} à venda na {address.street} - {address.neighborhood},{' '}
          {address.city} - ID{id} | EmCasa
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
