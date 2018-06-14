import React from 'react'
import NumberFormat from 'react-number-format'
import ListingCard from './Card'
import MessagesButton from './MessagesButton'
import Container, {CardWrapper, ListingInfo} from './styles'
import Statistics from 'components/listings/show/Statistics'
import {getParagraphs} from 'utils/text-utils'
import {canEdit} from 'permissions/listings-permissions'

export default class ListingMainContent extends React.Component {
  render() {
    const {listing, handleOpenPopup, user} = this.props
    const {street, neighborhood, street_number} = listing.address
    const showStatistics = user.admin || listing.user_id.toString() === user.id
    const paragraphs = getParagraphs(listing.description)
    const ownerOrAdmin = canEdit(user, listing)
    const listingInfo = ownerOrAdmin
      ? `${street}, ${street_number} ${
          listing.complement ? `- ${listing.complement}` : ''
        }`
      : `${street}`
    return (
      <Container>
        <div className="description">
          <h1 className="street">
            {listing.type} na {listingInfo}, {listing.address.neighborhood},{' '}
            {listing.address.city}
          </h1>
          <h6>O imóvel</h6>
          {paragraphs &&
            paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}

          <ListingInfo>
            <div>
              <h6>Tipo do imóvel</h6>
              <p>{listing.type}</p>
            </div>
            {listing.maintenance_fee && (
              <div>
                <h6>Condomínio</h6>
                <p>
                  <NumberFormat
                    value={listing.maintenance_fee}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    prefix={'R$'}
                    decimalSeparator={','}
                  />
                </p>
              </div>
            )}

            {listing.property_tax && (
              <div>
                <h6>Iptu</h6>
                <p>
                  <NumberFormat
                    value={listing.property_tax}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    prefix={'R$'}
                    decimalSeparator={','}
                  />
                </p>
              </div>
            )}
          </ListingInfo>
        </div>

        <CardWrapper>
          {user.authenticated && <MessagesButton listing={listing} />}
          <ListingCard listing={listing} handleOpenPopup={handleOpenPopup} />
          {showStatistics && <Statistics listing={listing} user={user} />}
        </CardWrapper>
      </Container>
    )
  }
}
