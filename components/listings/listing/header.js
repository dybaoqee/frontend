import { Component } from 'react'
import Link from 'next/link'
import NumberFormat from 'react-number-format'

import { mobileMedia } from '../../../constants/media'

class ListingHeader extends Component {
  render() {
    const { listing, isAuthenticated } = this.props

    return (
      <header>
        <div>
          <div>
            <h6>{listing.type}</h6>
            <p>{listing.address.street}</p>
            <p>
              {listing.address.neighborhood}, {listing.address.city}
            </p>
          </div>
          <div>
            <NumberFormat value={listing.price} displayType={'text'} thousandSeparator={'.'} prefix={'R$'} decimalSeparator={','} />
          </div>
        </div>

        {isAuthenticated && <Link href={`/listings/edit?id=${listing.id}`} as={`/listings/${listing.id}/edit`}>
          <a>Editar</a>
        </Link>}

        <button className="green" onClick={this.props.handleOpenPopup}>
          Marcar Visita
        </button>

        <style jsx>{`
          header {
            align-items: center;
            background: white;
            display: flex;
            justify-content: space-between;
            padding-left: 0;
            padding-right: 0;
            position: static;
            width: 100%;
          }

          button {
            margin-right: 20px;
          }

          header > div {
            align-items: center;
            display: flex;
            justify-content: space-between;
            width: 768px;
          }

          h6 {
            font-weight: normal;
            font-size: 11px;
            margin: 0;
            text-transform: uppercase;
          }

          p {
            margin: 0;
          }

          p:first-of-type {
            font-size: 18px;
          }

          p:last-of-type {
            font-size: 11px;
          }

          @media ${mobileMedia} {
            header {
              align-items: flex-end;
              justify-content: space-between;
              width: 100vw;
            }

            header > div {
              align-items: flex-start;
              flex-direction: column;
              max-width: 50vw;
            }

            header > div > div {
              margin-left: 10px;
            }

            header > div > div:last-of-type {
              margin-top: 10px;
            }

            header button {
              margin-right: 20px;
              margin-bottom: 6px;
            }
          }
        `}</style>
      </header>
    )
  }
}

export default ListingHeader
