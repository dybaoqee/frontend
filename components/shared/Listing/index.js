import {Component} from 'react'
import Link from 'next/link'
import NumberFormat from 'react-number-format'
import {mainListingThumbnail} from 'utils/image_url'
import Container from './styles'
import {buildSlug} from 'lib/listings'
import {
  log,
  LISTING_DETAIL_VIEW_FEATURED_LISTING
} from 'lib/amplitude'

export default class Listing extends Component {
  render() {
    const {id, images, price, address, type} = this.props.listing
    const imgUrl = mainListingThumbnail(images)

    return (
      <Link
        href={`/listings/show?id=${id}`}
        as={buildSlug(this.props.listing)}
        passHref
      >
        <a className="GTAG">
          <Container className="featured" onClick={() => {
            log(LISTING_DETAIL_VIEW_FEATURED_LISTING, {listingId: id})
          }}>
            <img
              decoding="async"
              className="image-container"
              alt={`asdasdaImagem ${type === 'Apartamento' ? 'do' : 'da'} ${type} ID-${id} à venda na ${address.street} - ${address.neighborhood}, ${address.city} - ${address.state}`}
              src={imgUrl}
            />
            <p className="price">
              <NumberFormat
                value={price}
                displayType={'text'}
                thousandSeparator={'.'}
                prefix={'R$'}
                decimalSeparator={','}
              />
            </p>
            <p className="street">{address.street}</p>
            <p className="neighborhood">{address.neighborhood}</p>
          </Container>
        </a>
      </Link>
    )
  }
}
