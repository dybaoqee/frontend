import {Component} from 'react'

import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import Listing from 'components/shared/Listing'

export default class ListingFeed extends Component {
  static defaultProps = {
    numberOfListingsToShow: 4,
  }

  render() {
    const {listings, numberOfListingsToShow} = this.props

    return (
      <div className="container">
        {listings
          .slice(0, numberOfListingsToShow)
          .map((listing) => <Listing key={listing.id} {...listing} />)}

        <style jsx>{`
          div.container {
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            padding: 60px 0;
            width: 1180px;
          }

          @media ${mobileMedia} {
            div.container {
              align-items: center;
              flex-direction: column;
              width: calc(100vw - 40px);

              > div {
                width: 100%;
              }
            }
          }
        `}</style>
      </div>
    )
  }
}
