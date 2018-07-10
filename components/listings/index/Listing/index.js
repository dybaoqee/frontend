import React, {Fragment} from 'react'
import Router from 'next/router'
import _ from 'lodash'
import NumberFormat from 'react-number-format'
import {canEdit} from 'permissions/listings-permissions'
import Link from 'next/link'
import ImageContainer from './ImageContainer'
import EmCasaButton from 'components/shared/Common/Buttons'
import TextContainer from './TextContainer'
import humps from 'humps'
import ListingWrapper, {
  ListingInfo,
  ListingInfoMobile,
  ListingContainer,
  ListingActions
} from './styles'
import {buildSlug} from 'lib/listings'

class Listing extends React.Component {
  handleListingClick = (e) => {
    const {listing} = this.props
    Router.push(`/listings/show?id=${listing.id}`, buildSlug(listing)).then(
      () => window.scrollTo(0, 0)
    )
  }

  render() {
    let {
      listing,
      currentUser,
      favorited,
      highlight,
      loading,
      onMouseEnter,
      onMouseLeave,
      mapOpenedOnMobile
    } = this.props
    listing = humps.decamelizeKeys(listing)

    const highlighListing = _.isEqual(highlight, {
      lat: listing.address.lat,
      lng: listing.address.lng
    })

    const favorite =
      favorited.filter(
        (actual) => actual.id.toString() === listing.id.toString()
      ).length > 0

    return (
      <ListingWrapper aria-label={`listing-${listing.id}`}>
        <Link
          href={`/listings/show?id=${listing.id}`}
          as={buildSlug(listing)}
          passHref
        >
          <a className="GTAG">
            <ListingContainer
              onMouseEnter={onMouseEnter && onMouseEnter.bind(this, listing)}
              onMouseLeave={onMouseLeave && onMouseLeave.bind(this, listing)}
              highlight={highlighListing}
              mapOpenedOnMobile={mapOpenedOnMobile}
            >
              <ImageContainer
                currentUser={currentUser}
                listing={listing}
                loading={loading}
                favorite={favorite}
                mapOpenedOnMobile={mapOpenedOnMobile}
              />
              <TextContainer
                loading={loading}
                favorite={favorite}
                listing={listing}
                currentUser={currentUser}
                mapOpenedOnMobile={mapOpenedOnMobile}
              />

              <ListingInfo mapOpenedOnMobile={mapOpenedOnMobile}>
                <NumberFormat
                  value={listing.price}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                />
              </ListingInfo>
              <ListingInfoMobile mapOpenedOnMobile={mapOpenedOnMobile}>
                <span className="address">{listing.address.street}</span>
                <span>
                  <NumberFormat
                    value={listing.price}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    prefix={'R$'}
                    decimalSeparator={','}
                  />
                </span>
              </ListingInfoMobile>
            </ListingContainer>
          </a>
        </Link>
        <ListingActions mapOpenedOnMobile={mapOpenedOnMobile}>
          {canEdit(currentUser, listing) && (
            <Link
              href={`/listings/edit?id=${listing.id}`}
              as={`/imoveis/${listing.id}/editar`}
              passHref
            >
              <a>
                <EmCasaButton secondary>Editar</EmCasaButton>
              </a>
            </Link>
          )}

          <Link
            href={`/listings/show?id=${listing.id}`}
            as={buildSlug(listing)}
            passHref
          >
            <a>
              <EmCasaButton>Ver Detalhes</EmCasaButton>
            </a>
          </Link>
        </ListingActions>
      </ListingWrapper>
    )
  }
}

export default Listing
