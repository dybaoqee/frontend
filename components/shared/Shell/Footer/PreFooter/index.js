import Link from 'next/link'
import Container from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPhone from '@fortawesome/fontawesome-free-brands/faWhatsapp'
import faMail from '@fortawesome/fontawesome-pro-light/faEnvelope'
export default () => (
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
        <span>21 99609-5399</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faMail} />
        <a href="mailto:contato@emcasa.com">Fale com a gente</a>
      </div>
    </div>
  </Container>
)
