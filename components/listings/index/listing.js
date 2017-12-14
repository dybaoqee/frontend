import React from 'react'
import Router from 'next/router'
import NumberFormat from 'react-number-format'

import ImageContainer from './image-container'
import TextContainer from './text-container'

import { mobileMedia } from '../../../constants/media'

class Listing extends React.Component {
  render() {
    const { listing, i, isAuthenticated } = this.props

    return (
      <div className="listing" key={i} onClick={() => Router.push(`/listings/show?id=${listing.id}`, `/listings/${listing.id}`).then(() => window.scrollTo(0, 0))}>
        <ImageContainer listing={listing} />
        <TextContainer listing={listing} isAuthenticated={isAuthenticated} />

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

