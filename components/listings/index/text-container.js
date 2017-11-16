import React from 'react'
import Link from 'next/link'

import ListingTable from '../listing_table'


class TextContainer extends React.Component {
  render() {
    const { listing } = this.props

    return (
      <div className="text-container">
        <div className="description">
          {listing.description}
        </div>

        <ListingTable listing={listing}/>

        <Link href={`/listing?id=${listing.id}`} as={`/listing/${listing.id}`} >
          <a className="btn">Ver Detalhes</a>
        </Link>

        <style jsx>{`
          .text-container {
            float: left;
            width: calc(100% - 300px);
          }

          div.description {
            font-size: 14px;
            margin: 20px 10px 0;
          }

          .btn {
            float: right;
            margin: 14px;
          }

          @media (max-width: 600px) {
            .text-container {
              width: 100%;
            }

            a.btn {
              margin: 10px 10px 30px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default TextContainer
