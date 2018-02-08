import {Component} from 'react'
import Link from 'next/link'

import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

export default class HomeBuySell extends Component {
  render() {
    return (
      <div className="container">
        <div>
          <h3>Pronto para comprar seu imóvel?</h3>
          <Link href={'/listings/index'} as={'/imoveis'}>
            <a>Comprar Imóvel</a>
          </Link>
        </div>

        <style jsx>{`
          div.container {
            border-top: 1px solid ${colors.lightGray};
            display: flex;
            height: 300px;
            padding: 0;
            div {
              align-items: center;
              display: flex;
              flex-direction: column;
              justify-content: center;
              width: 100%;
              h3 {
                font-size: 24px;
                font-weight: 300;
                margin-bottom: 30px;
                margin-top: 0;
                text-align: center;
              }
              a {
                border: 1px solid ${colors.blue};
                border-radius: 6px;
                color: ${colors.blue};
                padding: 15px 30px;
                text-decoration: none;
              }
            }
          }

          @media ${mobileMedia} {
            div.container {
              width: 100vw;
              h3 {
                max-width: calc(100% - 140px);
              }
            }
          }
        `}</style>
      </div>
    )
  }
}
