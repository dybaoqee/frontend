import React from 'react'

import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

import ListingCard from './Card'

export default class ListingMainContent extends React.Component {
  render() {
    const {listing, handleOpenPopup} = this.props
    const {street, neighborhood} = listing.address

    return (
      <div className="container">
        <div>
          <div className="description">
            <p className="street">
              {street}, {neighborhood}
            </p>

            <h6>{listing.type}</h6>
            <p>{listing.description}</p>
          </div>
        </div>

        <ListingCard listing={listing} handleOpenPopup={handleOpenPopup} />

        <style jsx>{`
          .container {
            align-items: flex-start;
            display: flex;
            justify-content: space-between;
            margin: 30px auto 40px;
            max-width: 960px;
            width: 100vw;
          }

          .container > div:first-of-type {
            max-width: 100vw;
            width: calc(100% - 380px);
          }

          .container > div:last-of-type {
            max-width: 100vw;
            width: 393px;
          }

          .container > div > div {
            margin: 20px 20px 40px;
          }

          .description {
            max-width: 100%;

            h6 {
              font-size: 12px;
              text-transform: uppercase;
            }

            p {
              color: ${colors.gray4a};
              font-size: 20px;
              font-weight: 300;
              &.street {
                font-weight: 400;
                margin-bottom: 60px;
              }
            }
          }

          @media ${mobileMedia} {
            .container {
              flex-direction: column;
              width: 100vw;
            }

            .container > div {
              width: 100vw;
            }

            .container > div:first-of-type {
              width: 100vw;
            }

            .description {
              width: calc(100vw - 40px);
            }
          }
        `}</style>
      </div>
    )
  }
}
