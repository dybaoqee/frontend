import React from 'react'
import NumberFormat from 'react-number-format'

import ImageContainer from './image-container'
import TextContainer from './text-container'

class Listing extends React.Component {
  render() {
    const { listing, i } = this.props

    return (
      <div className="listings-entry" key={i}>
        <ImageContainer listing={listing} />
        <TextContainer listing={listing} />

        {listing.matterport_code &&
          <span className="matterport">Tour Virtual</span>
        }

        <style jsx>{`
          .listings-entry {
            background: white;
            margin: 0 0 8px;
            overflow: auto;
            position: relative;
            width: 100%;
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


          @media (max-width: 600px) {
            .listings-entry > a {
              flex-direction: column;
              text-decoration: none;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Listing

