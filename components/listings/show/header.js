import {Component} from 'react'

import {mainListingImage} from 'utils/image_url'
import {desktopHeaderHeight} from 'constants/dimensions'
import * as colors from 'constants/colors'

export default class ListingHeader extends Component {
  render() {
    const {listing, handleOpenPopup} = this.props
    const imgSrc = mainListingImage(listing.images)

    return (
      <header>
        <div className="top-right">
          <button className="green" onClick={handleOpenPopup}>
            Marcar Visita
          </button>
        </div>
        <div className="bottom-right">
          <button>Ver Fotos</button>
          <button>Ver Tour 3D</button>
        </div>
        <style jsx>{`
          header {
            background-color: #f0f0f0;
            background-image: url(${imgSrc});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            height: calc(100vh - ${desktopHeaderHeight + 240}px);
            position: relative;
            width: 100vw;
          }

          header > div {
            position: absolute;
            &.bottom-right {
              bottom: 20px;
              right: 20px;
            }
            &.top-right {
              top: 20px;
              right: 20px;
            }
          }

          button {
            background: ${colors.offWhite};
            border: 1px solid ${colors.mediumGray};
            box-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            color: ${colors.text};
            margin-left: 20px;
          }

          button.green {
            background: ${colors.green};
            border: 1px solid ${colors.darkenedGreen};
            color: white;
            &:hover {
              background: ${colors.darkenedGreen};
            }
          }
        `}</style>
      </header>
    )
  }
}
