import React, { PureComponent } from 'react'
import {ThemeProvider} from 'styled-components'
import theme from '@emcasa/ui'
import {getParagraphs} from 'utils/text-utils'
import Statistics from 'components/listings/show/Statistics'
import {canEdit} from 'permissions/listings-permissions'
import Text from '@emcasa/ui-dom/components/Text'
import {
  log,
  LISTING_DETAIL_OPEN
} from 'lib/logging'
import ListingCard from './Card'
import Container, {
  CardWrapper,
  Title,
  SubTitle
} from './styles'

export default class ListingMainContent extends PureComponent {
  componentDidMount() {
    const {id, address, area, bathrooms, floor, garageSpots, price, rooms, type, maintenanceFee, propertyTax} = this.props.listing
    log(LISTING_DETAIL_OPEN, {
      listingId: id,
      neighborhood: address.neighborhoodSlug,
      city: address.citySlug,
      area,
      bathrooms,
      floor,
      garageSpots,
      price,
      rooms,
      type,
      maintenanceFee,
      propertyTax,
    })
  }

  render() {
    const {listing, handleOpenPopup, user} = this.props
    const {street, neighborhood, streetNumber} = listing.address
    const showStatistics = listing.owner
    const paragraphs = getParagraphs(listing.description)
    const ownerOrAdmin = canEdit(user, listing)
    const listingInfo = ownerOrAdmin
      ? `${street}, ${streetNumber} ${
          listing.complement ? `- ${listing.complement}` : ''
        }`
      : `${street}`

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <div>
            <Title>
              {listing.type} na {listingInfo}, {neighborhood},{' '}
              {listing.address.city}
            </Title>
            <SubTitle color="grey" fontSize="small">O IMÓVEL</SubTitle>
            {paragraphs && paragraphs.map((paragraph, i) => <Text key={i}>{paragraph}</Text>)}
          </div>
          <CardWrapper>
            <ListingCard
              listing={listing}
              handleOpenPopup={handleOpenPopup}
              user={user}
            />
            {showStatistics && <Statistics listing={listing} user={user} />}
          </CardWrapper>
        </Container>
      </ThemeProvider>
    )
  }
}
