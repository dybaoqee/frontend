import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import {getParagraphs} from 'utils/text-utils'
import {canEdit} from 'permissions/listings-permissions'
import {
  log,
  getListingInfoForLogs,
  LISTING_DETAIL_OPEN,
  LISTING_DETAIL_EXPAND_DESCRIPTION
} from 'lib/logging'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import ToggleButton from './ToggleButton'
import LikeButton from 'components/shared/Common/Buttons/Like'
import ListingInfo from './ListingInfo'
import {
  Container,
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
    const listingUserInfo = ownerOrAdmin
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
          <ListingInfo
            listing={listing}
            user={user}
            flagrFlags={this.props.flagrFlags}
            title={`${listing.type} na ${listingUserInfo}, ${neighborhood}, ${listing.address.city}`}
          />
          <ListingDescription expanded={this.state.expanded}>
            <ToggleButton expanded={this.state.expanded} onClick={this.toggleBody} />
            <SubTitle>O imóvel</SubTitle>
            {paragraphs && paragraphs.map((paragraph, i) => <Text key={i}>{paragraph}</Text>)}
            {user.admin &&
              <View my={4} style={{textAlign: 'center'}}>
                <a href={`${process.env.GARAGEM_URL}/imoveis/${listing.id}`} target="_blank">
                  <Button link height="auto" p={0}>
                    Ver no garagem
                  </Button>
                </a>
              </View>
            }
          </ListingDescription>
        </Container>
        <View mt={4}>
          <Button fluid height="tall" active onClick={handleOpenPopup}>Falar com especialista</Button>
        </View>
        <LikeButton
          top={-25}
          favorite={favorite}
          listing={listing}
          user={user}
          secondary
        />
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
