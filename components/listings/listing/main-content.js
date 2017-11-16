import React from 'react'

import ListingTable from '../listing_table'

class ListingMainContent extends React.Component {
  render() {
    const { listing } = this.props

    return (
      <div className="main-content">
        <img src={process.env.REACT_APP_S3_BASE_URL + 'listings/original/' + listing.photo} alt="Listing Main Pic"/>

        <div>
          <div>
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

          .main-content > div {
            width: 393px;
          }

          .main-content > div > div {
            margin: 20px 20px 40px;
          }

          img {
            width: 787px;
          }

          @media (max-width: 600px) {
            .main-content {
              flex-direction: column;
              width: 100vw;
            }
            .main-content img {
              width: 100vw;
            }
            .main-content  > div {
                width: 100vw;
              }
            }
          }
        `}</style>
      </div>
    )
  }
}

export default ListingMainContent
