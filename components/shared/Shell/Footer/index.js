import {ThemeProvider} from 'styled-components'
import theme from 'config/theme'
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
  Wrapper,
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
    <Wrapper>
      <Container flexDirection={['column',null,null,  'row']}>
        <Col width={[1,null,null,  6 / 12]} ml={[0,null,null,  '5vw']} mt="1.5em">
          <AboutLogo />
          <AboutText fontSize="small">
            A EmCasa é uma imobiliária digital tem como objetivo transformar a
            maneira que o brasileiro compra ou vende imóvel.
          </AboutText>
          <Text fontSize="16px"> CRECI-RJ J-7712</Text>
        </Col>
        <Col width={[1,null,null,  2 / 12]}>
          <Text {...titleText}>EmCasa</Text>
          <LinkGroup>
            <Link passHref href="/listings" as="/imoveis">
              <a>
                <TextLink>Compre</TextLink>
              </a>
            </Link>
            <Link passHref href="/listings/sell" as="/vender">
              <a>
                <TextLink>Venda</TextLink>
              </a>
            </Link>
            <a href="http://blog.emcasa.com" target="_blank">
              <TextLink>Blog</TextLink>
            </a>
            <a href="https://jobs.emcasa.com/" target="_blank">
              <TextLink>Trabalhe Conosco</TextLink>
            </a>
            <Link passHref href="/corretor-parceiro-rj">
              <a title="Seja um corretor parceiro no RJ">
                <TextLink>Seja um corretor parceiro no RJ</TextLink>
              </a>
            </Link>
            <Link passHref href="/corretor-parceiro-sp">
              <a title="Seja um corretor parceiro em SP">
                <TextLink>Seja um corretor parceiro em SP</TextLink>
              </a>
            </Link>
            <Link passHref href="/sitemap">
              <a>
                <TextLink>Mapa do Site</TextLink>
              </a>
            </Link>
          </LinkGroup>
        </Col>
        <Col width={[1,null,null,  2 / 12]}>
          <Text {...titleText}>Suporte</Text>
          <LinkGroup>
            <div>
              <a href="tel:+5521994771868">
                <TextLink>
                  <FontAwesomeIcon icon={faPhone} />
                  (21) 99477-1868
                </TextLink>
              </a>
            </div>
            <div>
              <a href="https://wa.me/5521994771868">
                <TextLink>
                  <FontAwesomeIcon icon={faWhatsapp} />
                  WhatsApp
                </TextLink>
              </a>
            </div>
            <div>
              <a href="mailto:contato@emcasa.com">
                <TextLink>
                  <FontAwesomeIcon icon={faMail} />
                  Fale com a gente
                </TextLink>
              </a>
            </div>
          </LinkGroup>
        </Col>
        <Col width={[1,null,null,  2 / 12]}>
          <Text {...titleText}>Redes Sociais</Text>
          <LinkGroup>
            <div>
              <a href="https://www.facebook.com/EmCasa" target="_blank">
                <TextLink>
                  <FontAwesomeIcon icon={faFacebook} />
                  Facebook
                </TextLink>
              </a>
            </div>
            <div>
              <a href="https://www.instagram.com/emcasaimoveis/" target="_blank">
                <TextLink>
                  <FontAwesomeIcon icon={faInstagram} />
                  Instagram
                </TextLink>
              </a>
            </div>
            <div>
              <a href="https://www.linkedin.com/company/emcasa/" target="_blank">
                <TextLink>
                  <FontAwesomeIcon icon={faLinkedin} />
                  LinkedIn
                </TextLink>
              </a>
            </div>
            <div>
              <a href="https://twitter.com/EmCasaTech" target="_blank">
                <TextLink>
                  <FontAwesomeIcon icon={faTwitter} />
                  Twitter
                </TextLink>
              </a>
            </div>
          </LinkGroup>
        </Col>
      </Container>
    </Wrapper>
  </ThemeProvider>
)

export default Footer
