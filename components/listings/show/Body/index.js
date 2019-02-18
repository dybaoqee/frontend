import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {ThemeProvider} from 'styled-components'
import theme from '@emcasa/ui'
import {getParagraphs} from 'utils/text-utils'
import {canEdit} from 'permissions/listings-permissions'
import Text from '@emcasa/ui-dom/components/Text'
import ToggleButton from './ToggleButton'
import ListingData from './ListingData'
import Button from '@emcasa/ui-dom/components/Button'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import {
  log,
  getListingInfoForLogs,
  LISTING_DETAIL_OPEN,
  LISTING_DETAIL_EXPAND_DESCRIPTION
} from 'lib/logging'
import ListingPanel from './ListingPanel'
import Container, {
  CardWrapper,
  Title,
  SubTitle,
  ListingDescription,
  MobileInfo
} from './styles'

class ListingMainContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.toggleBody = this.toggleBody.bind(this)
  }

  componentDidMount() {
    log(LISTING_DETAIL_OPEN, getListingInfoForLogs(this.props.listing))
  }

  toggleBody() {
    if (!this.state.expanded) {
      log(LISTING_DETAIL_EXPAND_DESCRIPTION, getListingInfoForLogs(this.props.listing))
    }
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const {listing, handleOpenPopup, user, favorite} = this.props
    const {street, neighborhood, streetNumber} = listing.address
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
          <ListingDescription expanded={this.state.expanded}>
            <ToggleButton expanded={this.state.expanded} onClick={this.toggleBody} />
            <Title fontSize="large" fontWeight="normal">
              {listing.type} na {listingInfo}, {neighborhood},{' '}
              {listing.address.city}
            </Title>
            <ListingData
              bedrooms={listing.rooms}
              bathrooms={listing.bathrooms}
              garageSpots={listing.garageSpots}
              area={listing.area}
              floor={listing.floor}
            />
            <SubTitle color="grey" fontSize="small">O IMÓVEL</SubTitle>
            {paragraphs && paragraphs.map((paragraph, i) => <Text fontFamily="FaktSoftPro-Blond" key={i}>{paragraph}</Text>)}
          </ListingDescription>
          <MobileInfo>
              <Row px={4} flexDirection="column">
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </MobileInfo>
          <CardWrapper>
            <ListingPanel
              listing={listing}
              handleOpenPopup={handleOpenPopup}
              user={user}
              favorite={favorite}
            />
            {user.admin &&
              <View my={4} style={{textAlign: 'center'}}>
                <a href={`${process.env.GARAGEM_URL}/imoveis/${listing.id}`} target="_blank">
                  <Button link height="auto" p={0}>
                    Ver no garagem
                  </Button>
                </a>
              </View>
            }
          </CardWrapper>
        </Container>
      </ThemeProvider>
    )
  }
}

ListingMainContent.propTypes = {
  listing: PropTypes.object.isRequired,
  handleOpenPopup: PropTypes.func.isRequired,
  user: PropTypes.object,
  favorite: PropTypes.bool
}

export default ListingMainContent
