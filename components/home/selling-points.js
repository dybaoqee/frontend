import {Component} from 'react'

import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

export default class HomeSellingPoints extends Component {
  render() {
    return (
      <div className="container">
        <h1>Imobiliária do jeito que deve ser</h1>
        <div>
          <div>
            <h2>Melhores condições de mercado</h2>
            <p>
              Nós não temos lojas físicas, escritórios em lugares caros e nem
              milhares de corretores. A boa notícia? Nós repassamos todas essas
              economias para você e oferecemos as melhores condições de mercado.
              Entre em contato conosco hoje mesmo e descubra como é comprar ou
              vender um imóvel com a gente.
            </p>
          </div>

          <div>
            <h2>Serviço especializado e de confiança</h2>
            <p>
              O setor imobiliário não se atualizou, e as empresas, os produtos e
              os problemas são os mesmos há mais de 50 anos. Nossa missão é
              transformar a forma de comprar e vender um imóvel no Brasil, e
              isso só é possível prestando um serviço confiável, eficaz e de
              qualidade. Nosso time não é remunerado com base em comissão e está
              capacitado para atender compradores e vendedores de forma
              transparente e imparcial.
            </p>
          </div>

          <div>
            <h2>Assistência jurídica e financeira</h2>
            <p>
              Compradores e proprietários contam com assessoria jurídica durante
              todas as etapas do processo, desde análise e levantamento de
              documentos, proposta de compra e venda, escritura e transferência
              de valores. Nossos clientes contam também com apoio para
              estruturação de financiamentos e retirada de FGTS.
            </p>
          </div>
        </div>
        <style jsx>{`
          div.container {
            padding-top: 60px;
          }

          h1 {
            font-weight: 300;
            text-align: center;
          }

          div.container > div {
            display: flex;
            justify-content: space-between;
            margin: 0 auto 60px;
            width: 960px;
            div {
              width: calc(33.3333% - 40px);
              h2 {
                color: ${colors.blue};
                font-weight: 300;
              }
              p {
                color: ${colors.mediumDarkGray};
                line-height: 1.8em;
              }
            }
          }

          @media ${mobileMedia} {
            div.container {
              align-items: center;
              display: flex;
              flex-direction: column;
              width: 100vw;
            }

            h1 {
              max-width: calc(100vw - 60px);
            }

            div.container div {
              align-items: center;
              flex-direction: column;
              width: 100vw;
              div {
                margin-bottom: 40px;
                width: calc(100% - 40px);
              }
            }
          }
        `}</style>
      </div>
    )
  }
}
