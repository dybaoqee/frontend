import { Component } from 'react'
import Link from 'next/link'

import * as colors from '../../constants/colors'

export default class HomeBuySell extends Component {
  render() {
    return <div className="container">
      <div>
        <h3>Pronto para comprar seu imóvel?</h3>
        <Link href={'/listings/index'} as={'/imoveis'}>
          <a>Comprar Imóvel</a>
        </Link>
      </div>

      <div>
        <h3>Quero vender meu imóvel!</h3>
        <Link href={'/listings/index'} as={'/imoveis'}>
          <a>Vender Imóvel</a>
        </Link>
      </div>
      <style jsx>{`
        h1 {
          text-align: center;
        }
        div.container {
          border-bottom: 1px solid ${colors.lightGray};
          border-top: 1px solid ${colors.lightGray};
          display: flex;
          height: 300px;
          padding: 0;
          margin-bottom: 40px;
          div {
            align-items: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: calc(50% - 1px);
            &:first-of-type {
              border-right: 1px solid ${colors.lightGray};
            }
            h3 {
              margin-bottom: 30px;
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
      `}</style>
    </div>
  }
}
