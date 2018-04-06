import React from 'react'
import Router from 'next/router'

import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

import ImageContainer from './ImageContainer'
import TextContainer from './TextContainer'
import humps from 'humps'

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
      Router.push(
        `/listings/show?id=${listing.id}`,
        `/imoveis/${listing.id}`
      ).then(() => window.scrollTo(0, 0))
    }
  }

  render() {
    let {id, listing, currentUser, favorited, loading} = this.props
    listing = humps.decamelizeKeys(listing)

    return (
      <div id={id} onClick={this.handleListingClick}>
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

        <style jsx>{`
          div {
            background: white;
            border-bottom: 1px solid ${colors.lightGray};
            cursor: pointer;
            overflow: hidden;
            padding-bottom: 20px;
            padding-top: 20px;
            position: relative;
            width: 100%;
          }

          div:hover {
            background: #f5f5f5;
          }

          div:first-of-type {
            padding-top: 23px;
          }

          span.matterport {
            background: rgba(240, 50, 50, 1);
            color: white;
            font-size: 9px;
            font-stretch: condensed;
            font-weight: bold;
            padding: 4px 30px;
            position: absolute;
            right: -35px;
            top: 24px;
            text-transform: uppercase;
            transform: rotate(45deg);
          }

          @media ${mobileMedia} {
            .listing > a {
              flex-direction: column;
              text-decoration: none;
            }
          }
        `}</style>

        <style jsx global>{`
          .listing:hover table {
            border-bottom: 1px solid #ccc;
          }
          .listing:hover table tr td {
            border-top: 1px solid #ccc !important;
          }
        `}</style>
      </div>
    )
  }
}

export default Listing
