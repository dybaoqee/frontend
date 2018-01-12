import { Component } from 'react'

import * as colors from '../../constants/colors'
import { mobileMedia } from '../../constants/media'

export default class HomeBuySell extends Component {
  render() {
    return <div>
      <h1>Conheça o nosso Tour Virtual</h1>
      <p>
        Nosso Tour 3D ajuda compradores a escolherem melhor quais imóveis visitar, economizando o tempo de todos envolvidos, e ajuda proprietários a atraírem mais atenção e venderem seus imóveis mais rapidamente.
      </p>

      <iframe width='100%' height='480' src="https://my.matterport.com/show/?m=SNpWfLUSZeC" frameBorder='0' allowFullScreen></iframe>
      <style jsx>{`
        div {
          align-items: center;
          border-top: 1px solid ${colors.lightGray};
          display: flex;
          clear: both;
          flex-direction: column;
          overflow: auto;
        }
        h1 {
          font-weight: 300;
          text-align: center;
        }
        p {
          color: ${colors.mediumDarkGray};
          font-size: 16px;
          line-height: 1.6em;
          margin-bottom: 60px;
          max-width: 500px;
          text-align: center;
        }

        @media ${mobileMedia} {
          div {
            display: none;
          }
        }

      `}</style>
    </div>
  }
}
