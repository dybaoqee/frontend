import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import {
  buildSlug,
  getListingSummary,
  getListingPrice,
  getListingValueRange
} from 'lib/listings'
import LikeButton from 'components/shared/Common/Buttons/Like'
import { thumbnailUrl } from 'utils/image_url'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import {Container} from './styles'
import {
  log,
  LISTING_DETAIL_VIEW_FEATURED_LISTING
} from 'lib/logging'
import {withTheme} from 'styled-components'

class ListingCard extends Component {
  render() {
    let {
      listing,
      currentUser,
      favorited: favoritedListings
    } = this.props

    const favorited =
      favoritedListings.filter(
        (actual) => actual.id.toString() === listing.id.toString()
      ).length > 0

    const thumbFilename = listing.images && listing.images[0] ? listing.images[0].filename : ''
    const thumbUrl = thumbnailUrl(thumbFilename, 600, 600)
    const listingSummary = getListingSummary(listing)
    const priceRange = getListingValueRange(listing, 'price')
    const priceRangeDelta = priceRange[1] - priceRange[0]

    return (
      <Link
        href={`/listings/show?id=${listing.id}`}
        as={buildSlug(listing)}
        passHref
      >
        <a style={{textDecoration: 'none'}}>
          <Container aria-label={`listing-${listing.id}`} onClick={(e) => {
            if (e.target.tagName !== 'path') {
              if (this.props.related) {
                log(LISTING_DETAIL_VIEW_FEATURED_LISTING, {listingId: listing.id})
              }
            }
          }}>
            <img
              decoding="async"
              src={thumbUrl}
              alt={`Imagem do imóvel ID-${listing.id} na ${listing.address.street}, ${listing.address.neighborhood}, ${listing.address.city} - ${listing.address.state}`}
            />
            <Row flexDirection="column" p={2}>
              <Row><Text inline fontSize="small">{listing.address.neighborhood.toUpperCase()}</Text></Row>
              <Row><Text inline fontSize="small">{listing.address.street}</Text></Row>
              <Row><Text inline fontSize="small" color="grey">{listingSummary}</Text></Row>
              <Row>
                <Text inline fontSize="large" fontWeight="bold">
                  <span style={{lineHeight: '100%', fontSize: `${(priceRangeDelta == 0 ? 1 : 0.8) * 100}%`}}>
                    {getListingPrice(listing)}
                  </span>
                </Text>
              </Row>
            </Row>
            <LikeButton
              favorite={favorited}
              listing={listing}
              user={currentUser}
              secondary
            />
          </Container>
        </a>
      </Link>
    )
  }
}

ListingCard.propTypes = {
  listing: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  favorited: PropTypes.array.isRequired,
  related: PropTypes.bool
}

export default withTheme(ListingCard)
