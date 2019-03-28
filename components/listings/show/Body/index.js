 import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import {getParagraphs} from 'utils/text-utils'
import {canEdit} from 'permissions/listings-permissions'
import Text from '@emcasa/ui-dom/components/Text'
import ToggleButton from './ToggleButton'
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
import {
  Container,
  CardWrapper,
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
    const {
        price,
        area,
        propertyTax,
        maintenanceFee
      } = this.props.listing
    const pricePerSquareMeter = Math.floor(price / area)

    return (
      <Row justifyContent="center" width="100%">
        <Container>
          <ListingPanel
            listing={listing}
            handleOpenPopup={handleOpenPopup}
            user={user}
            favorite={favorite}
            flagrFlags={this.props.flagrFlags}
            title={`${listing.type} na ${listingInfo}, ${neighborhood}, ${listing.address.city}`}
          />
          <ListingDescription expanded={this.state.expanded}>
            <ToggleButton expanded={this.state.expanded} onClick={this.toggleBody} />
            <SubTitle color="grey" fontSize="small">O IMÓVEL</SubTitle>
            {paragraphs && paragraphs.map((paragraph, i) => <Text fontFamily="FaktSoftPro-Blond" key={i}>{paragraph}</Text>)}
          </ListingDescription>
          {user.admin &&
            <View my={4} style={{textAlign: 'center'}}>
              <a href={`${process.env.GARAGEM_URL}/imoveis/${listing.id}`} target="_blank">
                <Button link height="auto" p={0}>
                  Ver no garagem
                </Button>
              </a>
            </View>
          }
        </Container>
      </Row>
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
