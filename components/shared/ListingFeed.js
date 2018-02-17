import {Component} from 'react'

import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import Listing from 'components/shared/Listing'

export default class ListingFeed extends Component {
  render() {
    const {listings} = this.props

    return (
      <div className="container">
        {listings.map((listing) => <Listing key={listing.id} {...listing} />)}

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
