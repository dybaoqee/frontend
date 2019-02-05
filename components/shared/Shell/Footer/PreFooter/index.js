import {Component} from 'react'
import Link from 'next/link'
import Container from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPhone from '@fortawesome/fontawesome-pro-light/faPhone'
import faWhatsApp from '@fortawesome/fontawesome-free-brands/faWhatsapp'
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
          <Link passHref href="/listings" as="/imoveis">
            <a>Compre</a>
          </Link>
          <Link passHref href="/listings/sell" as="/vender">
            <a>Venda</a>
          </Link>
          <Link href="http://blog.emcasa.com">
            <a>Blog</a>
          </Link>
          <Link href="https://jobs.emcasa.com/">
            <a>Trabalhe Conosco</a>
          </Link>
        </div>
        <div>
          <h4>Suporte</h4>
          <div>
            <FontAwesomeIcon icon={faPhone} />
            <a href="tel:+5521994771868"> (21) 99477-1868 </a>
          </div>
          <div>
            <FontAwesomeIcon icon={faWhatsApp} />
            <a href="https://wa.me/5521994771868">WhatsApp</a>
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
                    href={{
                      pathname: `/imoveis/rj/rio-de-janeiro/${slug(
                        neighborhood.toLowerCase()
                      )}`,
                      asPath: `/imoveis/rj/rio-de-janeiro/${slug(
                        neighborhood.toLowerCase()
                      )}`
                    }}
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
