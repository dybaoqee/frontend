import {Component} from 'react'
import Link from 'next/link'
import Container from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPhone from '@fortawesome/fontawesome-free-brands/faWhatsapp'
import faMail from '@fortawesome/fontawesome-pro-light/faEnvelope'
import {getNeighborhoods} from 'services/neighborhood-api'

export default class PreFooter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      neighborhoods: []
    }
  }
  async componentDidMount() {
    try {
      const neighborhoods = await getNeighborhoods().then(
        ({data}) => data.neighborhoods
      )
      this.setState({neighborhoods})
    } catch (e) {
      this.setState({neighborhoods: []})
    }
  }

  render() {
    const {neighborhoods} = this.state
    return (
      <Container>
        <div>
          <h4>EmCasa</h4>
          <Link href="/listings" as="/imoveis">
            <a>Compre</a>
          </Link>
          <Link href="/listings/sell/know-more" as="/saiba-mais-para-vender">
            <a>Venda</a>
          </Link>
          <Link href="/indique">
            <a>Indique e Ganhe</a>
          </Link>
          <Link href="http://blog.emcasa.com">
            <a>Blog</a>
          </Link>
          <Link href="/jobs">
            <a>Trabalhe Conosco</a>
          </Link>
        </div>
        <div>
          <h4>Suporte</h4>
          <div>
            <FontAwesomeIcon icon={faPhone} />
            <a href="tel:21 99609-5399">21 99609-5399</a>
          </div>
          <div>
            <FontAwesomeIcon icon={faMail} />
            <a href="mailto:contato@emcasa.com">Fale com a gente</a>
          </div>
        </div>
        <div className="neighborhoods">
          <h4>Imóveis à venda no Rio de Janeiro</h4>
          {neighborhoods.map((neighborhood) => (
            <Link
              key={neighborhood}
              href={`/listings/?bairros=${neighborhood}`}
              as={`/imoveis?bairros=${neighborhood}`}
            >
              <a title={`Comprar imóvel: ${neighborhood}`}>{neighborhood}</a>
            </Link>
          ))}
        </div>
      </Container>
    )
  }
}
