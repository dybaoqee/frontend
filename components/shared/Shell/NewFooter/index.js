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
  AboutText,
  AboutLogo,
  LinkGroup
} from './styles'

const titleText = {
  fontWeight: 'bold'
}

const Footer = () => (
  <ThemeProvider theme={theme}>
    <Container flexDirection={['column', 'row']}>
      <Col width={[1, 6 / 12]} ml={[0, '5vw']} mt="1.5em">
        <AboutLogo />
        <AboutText fontSize="small">
          A EmCasa é uma imobiliária digital que usa tecnologia e design para simplificar a compra e venda de apartamentos e casas no Rio de Janeiro e em São Paulo
        </AboutText>
        <Text fontSize="16px"> CRECI-RJ J-7712</Text>
      </Col>
      <Col width={[1, 2 / 12]}>
        <Text {...titleText}>EmCasa</Text>
        <LinkGroup>
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
        </LinkGroup>
      </Col>
      <Col width={[1, 2 / 12]}>
        <Text {...titleText}>Suporte</Text>
        <LinkGroup>
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
        </LinkGroup>
      </Col>
      <Col width={[1, 2 / 12]}>
        <Text {...titleText}>Redes Sociais</Text>
        <LinkGroup>
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
        </LinkGroup>
      </Col>
    </Container>
  </ThemeProvider>
)

export default Footer
