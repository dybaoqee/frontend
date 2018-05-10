import React from 'react'
import Router from 'next/router'
import _ from 'lodash'
import NumberFormat from 'react-number-format'
import {canEdit} from 'permissions/listings-permissions'
import Link from 'next/link'
import ImageContainer from './ImageContainer'
import EmCasaButton from 'components/shared/Common/Buttons'
import TextContainer from './TextContainer'
import humps from 'humps'
import {ListingInfoMobile} from './styles'
import Container from './styles'
import {ListingInfo} from './styles'

class Listing extends React.Component {
  handleListingClick = (e) => {
    const {listing} = this.props
    // We have admin links inside a "link"
    // (each listing is fully clickable)
    // This function prevents double link attribution,
    // which breaks back button behaviour.
    if (
      e.target.getAttribute('class') &&
      e.target.getAttribute('class').indexOf('cancel-listing-nav') == -1
    ) {
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        // Only trigger window.open if element clicked is not .btn
        if (
          e.target.getAttribute('class') &&
          e.target.getAttribute('class').indexOf('btn') == -1
        ) {
          window.open(`/imoveis/${listing.id}`, '_blank')
          return false
        }
      } else {
        Router.push(
          `/listings/show?id=${listing.id}`,
          `/imoveis/${listing.id}`
        ).then(() => window.scrollTo(0, 0))
      }
    }
  }

  render() {
    let {
      id,
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
      <Container
        id={id}
        onClick={this.handleListingClick}
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
        <div className="listing-info">
          <ListingInfo mapOpenedOnMobile={mapOpenedOnMobile}>
            <NumberFormat
              value={listing.price}
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
            />
          </ListingInfo>
          <div className="link-container">
            {canEdit(currentUser, listing) && (
              <Link
                href={`/listings/edit?id=${listing.id}`}
                as={`/imoveis/${listing.id}/editar`}
              >
                <EmCasaButton className="cancel-listing-nav" secondary>
                  Editar
                </EmCasaButton>
              </Link>
            )}

            <Link
              href={`/listings/show?id=${listing.id}`}
              as={`/imoveis/${listing.id}`}
            >
              <EmCasaButton className="cancel-listing-nav">
                Ver Detalhes
              </EmCasaButton>
            </Link>
          </div>
        </div>
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
      </Container>
    )
  }
}

export default Listing
