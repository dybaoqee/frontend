import {
  Component,
  Fragment
} from 'react'
import NextHead from 'components/shared/NextHead'
import {mainListingImage} from 'utils/image_url'
import {
  SchemaWebSite,
  SchemaRealEstateAgent,
  SchemaOrganization
} from 'constants/ld-json'

const BASE_URL = 'https://www.emcasa.com'

export default class ListingHead extends Component {
  render() {
    const {
      listing: {matterportCode, type, images, address, rooms, area, price, id}
    } = this.props
    const {routerAsPath} = this.props
    const seoImgSrc = mainListingImage(images)

    const description = `Conheça ${
      matterportCode ? 'com Tour Virtual 3D' : ''
    } ${type.charAt(type.length - 1)} ${type} na ${address.street}, ${
      address.neighborhood
    }, ${address.city} - ${rooms} dormitórios, ${area} metros quadrados, R$ ${
      price ? price.toLocaleString('pt-BR') : 0
    },00 - ID${id}`

    return (
      <Fragment>
        <NextHead
          title={`${type} à venda na ${address.street} - ${address.neighborhood}, ${address.city} - ID${id} | EmCasa`}
          description={description}
          imageSrc={seoImgSrc}
          imageWidth={'1024'}
          imageHeight={'768'}
          url={`${BASE_URL}${routerAsPath}`}
          canonical={`${BASE_URL}${routerAsPath}`}
        >
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
        </NextHead>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SchemaWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SchemaRealEstateAgent) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SchemaOrganization) }}
        />
      </Fragment>
    )
  }
}
