import React from 'react'
import Link from 'next/link'

import { mobileMedia } from '../../../constants/media'

class ListingFooter extends React.Component {
  render() {
    const { listing } = this.props

    return (
      <footer>
        <div>
          <Link href="/">
            <a>‹ Ver Todos os Imóveis</a>
          </Link>
          <a href="mailto:contato@emcasa.com">contato@emcasa.com</a>
        </div>
        <button className="green">
          Marcar Visita
        </button>

        <style jsx>{`
          footer {
            align-items: center;
            border-top: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            padding: 20px 20px;
          }

          a {
            color: #2c6e8e;
            font-size: 12px;
            margin-right: 30px;
            text-decoration: none;
          }

          @media ${mobileMedia} {
            footer {
              width: calc(100vw - 40px);
            }

            div {
              width: calc(100vw - 180px);
            }

            a {
              display: none;
              float: left;
            }

            a:first-of-type {
              display: block;
            }
          }
        `}</style>
      </footer>
    )
  }
}

export default ListingFooter
