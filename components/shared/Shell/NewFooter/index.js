import {Fragment} from 'react'
import {ThemeProvider} from 'styled-components'
import theme from '@emcasa/ui'
import Link from 'next/link'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPhone from '@fortawesome/fontawesome-pro-light/faPhone'
import faMail from '@fortawesome/fontawesome-pro-light/faEnvelope'
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faWhatsapp
} from '@fortawesome/fontawesome-free-brands'

const Footer = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Col>
        <Text>
          A EmCasa é uma imobiliária digital que usa tecnologia e design para simplificar a compra e venda de apartamentos e casas no Rio de Janeiro e em São Paulo
        </Text>
        <Text> CRECI-RJ J-7712</Text>
      </Col>
      <Col>
        <Text>EmCasa</Text>
        <Link href="/listings" as="/imoveis">
          <Text>Compre</Text>
        </Link>
        <Link href="/listings/sell/know-more" as="/saiba-mais-para-vender">
          <Text>Venda</Text>
        </Link>
        <Link href="http://blog.emcasa.com">
          <Text>Blog</Text>
        </Link>
        <Link href="https://jobs.emcasa.com/">
          <Text>Trabalhe Conosco</Text>
        </Link>
        <Link href="/sitemap">
          <Text>Mapa do site</Text>
        </Link>
      </Col>
      <Col>
        <Text>Suporte</Text>
        <div>
          <FontAwesomeIcon icon={faPhone} />
          <a href="tel:+5521994771868"> (21) 99477-1868 </a>
        </div>
        <div>
          <FontAwesomeIcon icon={faWhatsapp} />
          <a href="https://wa.me/5521994771868">WhatsApp</a>
        </div>
        <div>
          <FontAwesomeIcon icon={faMail} />
          <a href="mailto:contato@emcasa.com">Fale com a gente</a>
        </div>
      </Col>
      <Col>
        <Text>Redes Sociais</Text>
        <div>
          <a
            href="https://www.facebook.com/EmCasa"
            target="_blank"
            className="icon"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
        <div>
          <a
            href="https://www.instagram.com/emcasaimoveis/"
            target="_blank"
            className="icon"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/company/emcasa/"
            target="_blank"
            className="icon"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
        <div>
          <a
            href="https://twitter.com/EmCasaTech"
            target="_blank"
            className="icon"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
      </Col>
    </Fragment>
  </ThemeProvider>
)

export default Footer
