import React from 'react'
import Router from 'next/router'
import _ from 'lodash'

import ImageContainer from './ImageContainer'
import TextContainer from './TextContainer'
import humps from 'humps'

import Container from './styles'

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
      onMouseLeave
    } = this.props
    listing = humps.decamelizeKeys(listing)

    const highlighListing = _.isEqual(highlight, {
      lat: listing.address.lat,
      lng: listing.address.lng
    })

    return (
      <Container
        id={id}
        onClick={this.handleListingClick}
        onMouseEnter={onMouseEnter && onMouseEnter.bind(this, listing)}
        onMouseLeave={onMouseLeave && onMouseLeave.bind(this, listing)}
        highlight={highlighListing}
      >
        <ImageContainer
          currentUser={currentUser}
          listing={listing}
          favorite={
            favorited.filter(
              (actual) => actual.id.toString() === listing.id.toString()
            ).length > 0
          }
          loading={loading}
        />
        <TextContainer listing={listing} currentUser={currentUser} />

        {listing.matterport_code && (
          <span className="matterport">Tour Virtual</span>
        )}
      </Container>
    )
  }
}

export default Listing
