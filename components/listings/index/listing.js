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

        <style jsx>{`
          .listings-entry {
            background: white;
            margin: 0 0 8px;
            overflow: auto;
            width: 100%;
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

