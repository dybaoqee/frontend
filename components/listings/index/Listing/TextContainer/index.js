import {Component} from 'react'
import Link from 'next/link'
import ListingTable from '../Table'
import Container from './styles'
import LikeButton from 'components/shared/Common/Buttons/Like'

export default class TextContainer extends Component {
  truncateDescription = () => {
    const {description} = this.props.listing

    if (!description) return

    var re = description.match(/^.{0,300}[\S]*/)
    var l = re[0].length
    re = re[0].replace(/\s$/, '')
    if (l < description.length) {
      re = re + '…'
    }

    return re
  }

  render() {
    const {
      listing,
      mapOpenedOnMobile,
      loading,
      favorite,
      currentUser
    } = this.props
    const {id} = listing

    return (
      <Container mapOpenedOnMobile={mapOpenedOnMobile}>
        <div className="header">
          <div className="address">
            <p>{listing.address.street}</p>
            <span>{listing.address.neighborhood}</span>
          </div>
          {!loading && (
            <LikeButton
              favorite={favorite}
              listing={listing}
              user={currentUser}
              secondary
            />
          )}
        </div>
        <div className="description">
          {this.truncateDescription()}{' '}
          <Link href={`/listings/show?id=${id}`} as={`/imoveis/${id}`}>
            Saiba Mais →
          </Link>
        </div>

        <ListingTable listing={listing} mapOpenedOnMobile={mapOpenedOnMobile} />
      </Container>
    )
  }
}
