import {ThemeProvider} from 'styled-components'
import theme from '@emcasa/ui'
import Link from 'next/link'
import Col from '@emcasa/ui-dom/components/Col'
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

import {
  Container,
  TextLink,
  AboutText
} from './styles'

const titleText = {
  fontWeight: 'bold'
}

const Footer = () => (
  <ThemeProvider theme={theme}>
    <Container>
      <Col width={6 / 12}>
        <AboutText fontSize="small">
          A EmCasa é uma imobiliária digital que usa tecnologia e design para simplificar a compra e venda de apartamentos e casas no Rio de Janeiro e em São Paulo
        </AboutText>
        <Text fontSize="16px"> CRECI-RJ J-7712</Text>
      </Col>
      <Col width={2 / 12}>
        <Text {...titleText}>EmCasa</Text>
        <Link href="/listings" as="/imoveis">
          <TextLink>Compre</TextLink>
        </Link>
        <Link href="/listings/sell/know-more" as="/saiba-mais-para-vender">
          <TextLink>Venda</TextLink>
        </Link>
        <Link href="http://blog.emcasa.com">
          <TextLink>Blog</TextLink>
        </Link>
        <Link href="https://jobs.emcasa.com/">
          <TextLink>Trabalhe Conosco</TextLink>
        </Link>
        <Link href="/sitemap">
          <TextLink>Mapa do site</TextLink>
        </Link>
      </Col>
      <Col width={2 / 12}>
        <Text {...titleText}>Suporte</Text>
        <div>
          <TextLink>
            <FontAwesomeIcon icon={faPhone} />
            (21) 99477-1868
          </TextLink>
        </div>
        <div>
          <TextLink>
            <FontAwesomeIcon icon={faWhatsapp} />
            WhatsApp
          </TextLink>
        </div>
        <div>
          <TextLink>
            <FontAwesomeIcon icon={faMail} />
            Fale com a gente
          </TextLink>
        </div>
      </Col>
      <Col width={2 / 12}>
        <Text {...titleText}>Redes Sociais</Text>
        <div>
          <TextLink>
            <FontAwesomeIcon icon={faFacebook} />
            Facebook
          </TextLink>
        </div>
        <div>
          <TextLink>
            <FontAwesomeIcon icon={faInstagram} />
            Instagram
          </TextLink>
        </div>
        <div>
          <TextLink>
            <FontAwesomeIcon icon={faLinkedin} />
            LinkedIn
          </TextLink>
        </div>
        <div>
          <TextLink>
            <FontAwesomeIcon icon={faTwitter} />
            Twitter
          </TextLink>
        </div>
      </Col>
    </Container>
  </ThemeProvider>
)

export default Footer
