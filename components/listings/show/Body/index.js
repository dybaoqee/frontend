import React from 'react'
import NumberFormat from 'react-number-format'
import ListingCard from './Card'
import Container, {CardWrapper, ListingInfo} from './styles'
import Statistics from 'components/listings/show/Statistics'

export default class ListingMainContent extends React.Component {
  render() {
    const {listing, handleOpenPopup, user} = this.props
    const {street, neighborhood} = listing.address

    return (
      <Container>
        <div className="description">
          <h1 className="street">
            {street}, {neighborhood}
          </h1>
          <h6>O imóvel</h6>
          <p className="description__text">{listing.description}</p>
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
          {user.admin && <Statistics listing={listing} />}
        </CardWrapper>
      </Container>
    )
  }
}
