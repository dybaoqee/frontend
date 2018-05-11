import React from 'react'
import NumberFormat from 'react-number-format'
import ListingCard from './Card'
import Container, {CardWrapper, ListingInfo} from './styles'
import Statistics from 'components/listings/show/Statistics'
import {getParagraphs} from 'utils/text-utils'

export default class ListingMainContent extends React.Component {
  render() {
    const {listing, handleOpenPopup, user} = this.props
    const {street, neighborhood} = listing.address
    const showStatistics = user.admin || listing.user_id.toString() === user.id
    const paragraphs = getParagraphs(listing.description)
    return (
      <Container>
        <div className="description">
          <h1 className="street">
            {street}, {neighborhood}
          </h1>
          <h6>O imóvel</h6>
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="description__text">
              {paragraph}
            </p>
          ))}

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
          <ListingCard listing={listing} handleOpenPopup={handleOpenPopup} />
          {showStatistics && <Statistics listing={listing} user={user} />}
        </CardWrapper>
      </Container>
    )
  }
}
