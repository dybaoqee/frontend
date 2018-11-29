import React, { Component } from 'react'
import Router from 'next/router'
import NumberFormat from 'react-number-format'
import Link from 'next/link'
import humps from 'humps'

import {buildSlug} from 'lib/listings'
import LikeButton from 'components/shared/Common/Buttons/Like'
import BlacklistButton from 'components/shared/Common/Buttons/Blacklist'
import { thumbnailUrl } from 'utils/image_url'
import { intToCurrency } from 'utils/text-utils'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import {
  Container,
  ListingImage,
  LikeButtonContainer,
  THUMB_WIDTH,
  THUMB_HEIGHT
} from './styles'

class ListingCard extends Component {
  handleListingClick = () => {
    const {listing} = this.props
    Router.push(`/listings/show?id=${listing.id}`, buildSlug(listing)).then(
      () => window.scrollTo(0, 0)
    )
  }

  render() {
    let {
      listing,
      currentUser,
      favorited: favoritedListings,
      blacklists,
      loading,
    } = this.props
    listing = humps.decamelizeKeys(listing)

    const favorited =
      favoritedListings.filter(
        (actual) => actual.id.toString() === listing.id.toString()
      ).length > 0

    const blacklisted =
      blacklists.filter(
        (actual) => actual.id.toString() === listing.id.toString()
      ).length > 0

    const thumbFilename = listing.images && listing.images[0] ? listing.images[0].filename : ''
    const thumbUrl = thumbnailUrl(thumbFilename, THUMB_WIDTH * 2, THUMB_HEIGHT * 2)
    return (
      <Link
        href={`/listings/show?id=${listing.id}`}
        as={buildSlug(listing)}
        passHref
      >
        <Container aria-label={`listing-${listing.id}`}>
          <ListingImage url={thumbUrl} />
          <Row flexDirection="column" p={2}>
            <Row><Text inline fontSize="small">{listing.address.neighborhood.toUpperCase()}</Text></Row>
            <Row><Text inline fontSize="small">{listing.address.street}</Text></Row>
            <Row><Text inline></Text></Row>
            <Row><Text inline fontSize="large" fontWeight="bold">{intToCurrency(listing.price)}</Text></Row>
          </Row>
          <LikeButtonContainer>
            <LikeButton
              favorite={favorited}
              listing={listing}
              user={currentUser}
              secondary
            />
            <BlacklistButton
              blacklisted={blacklisted}
              listing={listing}
              user={currentUser}
              secondary
            />
          </LikeButtonContainer>
        </Container>
      </Link>
    )
  }
}

export default ListingCard
