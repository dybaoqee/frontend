import {Component} from "react"
import Link from 'next/link'
import NumberFormat from 'react-number-format'

import {mainListingThumbnail} from 'utils/image_url'
import Container from "./styles"

export default class Listing extends Component {
  render() {
    const { id, images, price, address } = this.props
    const imgUrl = mainListingThumbnail(images)
    const imgStyle = {backgroundImage: `url(${imgUrl})`}

    return (
      <Link
        href={`/listings/show?id=${id}`}
        as={`/imoveis/${id}`}
        key={id}
        prefetch
      >
        <Container>
          <div className="image-container" style={imgStyle} />
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
      </Link>
    )
  }
}
