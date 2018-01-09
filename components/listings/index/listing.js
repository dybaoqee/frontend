import React from 'react'
import Router from 'next/router'

import ImageContainer from './image-container'
import TextContainer from './text-container'

import { mobileMedia } from '../../../constants/media'

class Listing extends React.Component {
  handleListingClick = (e) => {
    const { listing } = this.props

    // We have admin links inside a "link"
    // (each listing is fully clickable)
    // This function prevents double link attribution,
    // which breaks back button behaviour.
    if (e.target.getAttribute('class').indexOf('cancel-listing-nav') == -1) {
      Router.push(`/listings/show?id=${listing.id}`, `/imoveis/${listing.id}`)
        .then(() => window.scrollTo(0, 0))
    }
  }

  render() {
    const { listing, i, authenticated } = this.props

    return (
      <div className="listing" key={i} onClick={this.handleListingClick}>
        <ImageContainer listing={listing} />
        <TextContainer listing={listing} authenticated={authenticated} />

        {listing.matterport_code &&
          <span className="matterport">Tour Virtual</span>
        }

        <style jsx>{`
          .listing {
            background: white;
            cursor: pointer;
            margin: 0 0 8px;
            overflow: hidden;
            position: relative;
            width: 100%;
          }

          .listing:hover {
            background: #f5f5f5;
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

