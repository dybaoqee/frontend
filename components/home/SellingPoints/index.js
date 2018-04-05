import {Component} from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faDollarSign from '@fortawesome/fontawesome-free-solid/faDollarSign'
import faDesktop from '@fortawesome/fontawesome-free-solid/faDesktop'
import faFileAlt from '@fortawesome/fontawesome-free-solid/faFileAlt'

import Container from './styles'

export default class HomeSellingPoints extends Component {
  render() {
    return (
      <Container>
        <h1>Imobiliária do jeito que deve ser</h1>
        <div>
          <div>
            <FontAwesomeIcon icon={faDollarSign} />
            <p>
              Não temos lojas físicas nem escritórios em lugares caros. Nossa
              tecnologia nos ajuda a reduzir custos e repassamos todas nossas
              economias para o cliente final, oferecendo as melhores condições
              de mercado do Brasil.
            </p>
          </div>

          <div>
            <FontAwesomeIcon icon={faDesktop} />
            <p>
              Usamos tecnologia para melhorar a experiência e inteligência de
              dados para oferecer recomendações precisas. Nosso time é treinado,
              capacitado e remunerado com base na satisfação do cliente,
              garantindo alta qualidade de serviço.
            </p>
          </div>

          <div>
            <FontAwesomeIcon icon={faFileAlt} />
            <p>
              Sabemos que comprar e vender um imóvel pode ser complicado, com
              contratos, propostas e tudo mais. Nós apoiamos compradores e
              vendedores em todas as etapas do processo (inclusive com
              Financiamento e retirada de FGTS).
            </p>
          </div>
        </div>
      </Container>
    )
  }
}
