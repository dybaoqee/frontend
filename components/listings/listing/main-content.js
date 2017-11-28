import React from 'react'

import ListingTable from '../listing_table'
import Matterport from './matterport'
import ImageGallery from './image-gallery'
import { mobileMedia } from '../../../constants/media'

class ListingMainContent extends React.Component {
  render() {
    const { listing } = this.props

    return (
      <div className="main-content">
        <div>
          <Matterport listing={listing} />
          <ImageGallery images={listing.images} />
        </div>

        <div>
          <div className="description">
            {listing.description}
          </div>

          <ListingTable listing={listing}/>
        </div>

        <style jsx>{`
          .main-content {
            align-items: flex-start;
            display: flex;
            margin-bottom: 40px;
            margin-top: 30px;
          }

          .main-content > * {
            float: left;
          }

          .main-content > div:first-of-type {
            max-width: 100vw;
            width: 787px;
          }

          .main-content > div:last-of-type {
            max-width: 100vw;
            width: 393px;
          }

          .main-content > div > div {
            margin: 20px 20px 40px;
          }

          .description {
            max-width: 100%;
          }

          @media ${mobileMedia} {
            .main-content {
              flex-direction: column;
              width: 100vw;
            }

            .main-content  > div {
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
