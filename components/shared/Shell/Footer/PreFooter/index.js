import {Component} from 'react'
import Link from 'next/link'
import Container from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPhone from '@fortawesome/fontawesome-free-brands/faWhatsapp'
import faMail from '@fortawesome/fontawesome-pro-light/faEnvelope'
import slug from 'slug'
import {Query} from 'react-apollo'
import {GET_NEIGHBORHOODS} from 'graphql/listings/queries'

export default class PreFooter extends Component {
  render() {
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
            <a href="tel:+55 21 99609-5399">21 99609-5399</a>
          </div>
          <div>
            <FontAwesomeIcon icon={faMail} />
            <a href="mailto:contato@emcasa.com">Fale com a gente</a>
          </div>
        </div>
        <div className="neighborhoods">
          <h4>Imóveis à venda no Rio de Janeiro</h4>
          <Query query={GET_NEIGHBORHOODS}>
            {({data: {neighborhoods}, loading}) =>
              loading ? (
                <div />
              ) : (
                neighborhoods.map((neighborhood) => (
                  <Link
                    key={neighborhood}
                    href={`/listings/?bairros=${neighborhood}`}
                    as={`/imoveis/rj/rio-de-janeiro/${slug(
                      neighborhood.toLowerCase()
                    )}`}
                  >
                    <a title={`Comprar imóvel: ${neighborhood}`}>
                      {neighborhood}
                    </a>
                  </Link>
                ))
              )
            }
          </Query>
        </div>
      </Container>
    )
  }
}
