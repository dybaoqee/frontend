import {Component} from 'react'

import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import Listing from "../shared/Listing"

export default class HomeListings extends Component {
  render() {
    const {listings} = this.props
    const numberOfListingsToShow = 4

    return (
      <div className="container">
        {listings.slice(0, numberOfListingsToShow).map(listing => <Listing {...listing} />)}

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
                margin-bottom: 30px;
                width: 100%;
              }
            }
          }
        `}</style>
      </div>
    )
  }
}
