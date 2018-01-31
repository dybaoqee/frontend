import React from 'react'

import ListingTable from 'components/listings/listing_table'
import {mobileMedia} from 'constants/media'
import {maxDesktopOneColumn} from 'constants/dimensions'

class ListingMainContent extends React.Component {
  render() {
    const {listing} = this.props

    return (
      <div className="container">
        <div>
          <div className="description">
            <h6>{listing.type}</h6>
            {listing.description}
          </div>
        </div>

        <div>
          <ListingTable listing={listing} />
        </div>

        <style jsx>{`
          .container {
            align-items: flex-start;
            display: flex;
            margin-bottom: 40px;
            margin-top: 30px;
            max-width: ${maxDesktopOneColumn};
            width: 100vw;
          }

          .container > * {
            float: left;
          }

          .container > div:first-of-type {
            max-width: 100vw;
            width: 787px;
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
          }

          @media ${mobileMedia} {
            .container {
              flex-direction: column;
              width: 100vw;
            }

            .container  > div {
                width: 100vw;
              }
            }

            .description {
              width: calc(100vw - 40px);
          }
        `}</style>
      </div>
    )
  }
}

export default ListingMainContent
