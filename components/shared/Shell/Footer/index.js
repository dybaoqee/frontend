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
  AboutContainer,
  AboutText,
  LogoWrapper,
  LinksItem,
  LinksContainer,
  TitleLinks,
  TextLink
} from './styles'
import Logo from 'components/shared/Logo'

const titleText = {
  fontWeight: 'bold'
}

const Footer = () => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <Container>
        <AboutContainer>
          <LogoWrapper>
            <Logo logoFill="white" textFill="white" />
          </LogoWrapper>
          <AboutText fontSize="small" color="disabled">
            A EmCasa é uma imobiliária digital tem como objetivo transformar a
            maneira que o brasileiro compra ou vende imóvel.
          </AboutText>
          <AboutText fontSize="small" color="disabled">CRECI-RJ J-7712</AboutText>
        </AboutContainer>
        <LinksContainer>
          <LinksItem flexDirection="column">
            <TitleLinks {...titleText}>EmCasa</TitleLinks>
            <Link passHref href="/sobmedida">
              <TextLink as="a">EmCasa Sob Medida</TextLink>
            </Link>
            <Link passHref href="/listings" as="/imoveis">
              <TextLink as="a">Compre</TextLink>
            </Link>
            <Link passHref href="/listings/sell" as="/vender">
              <TextLink as="a">Venda</TextLink>
            </Link>
            <Link passHref href="/avaliacao-imovel">
              <TextLink as="a">Avalie seu imóvel</TextLink>
            </Link>
            <TextLink as="a" href="http://blog.emcasa.com" target="_blank">Blog</TextLink>
            <TextLink as="a" href="https://jobs.emcasa.com/" target="_blank">Trabalhe Conosco</TextLink>
            <Link passHref href="/corretor-parceiro-rj">
              <TextLink as="a">Seja um corretor parceiro no RJ</TextLink>
            </Link>
            <Link passHref href="/corretor-parceiro-sp">
              <TextLink as="a">Seja um corretor parceiro em SP</TextLink>
            </Link>
            <Link passHref href="/sitemap">
              <TextLink as="a">Mapa do Site</TextLink>
            </Link>
          </LinksItem>
          <LinksItem flexDirection="column">
            <TitleLinks {...titleText}>Suporte</TitleLinks>
            <TextLink as="a" href="tel:+5521994771868">
              <FontAwesomeIcon icon={faPhone} />
              (21) 99477-1868
            </TextLink>
            <TextLink as="a" href="https://wa.me/5521994771868">
              <FontAwesomeIcon icon={faWhatsapp} />
              WhatsApp
            </TextLink>
            <TextLink as="a" href="mailto:contato@emcasa.com">
              <FontAwesomeIcon icon={faMail} />
              Fale com a gente
            </TextLink>
          </LinksItem>
          <LinksItem flexDirection="column">
            <TitleLinks {...titleText}>Redes Sociais</TitleLinks>
            <TextLink as="a" href="https://www.facebook.com/EmCasa" target="_blank">
              <FontAwesomeIcon icon={faFacebook} />
              Facebook
            </TextLink>
            <TextLink as="a" href="https://www.instagram.com/emcasa" target="_blank">
              <FontAwesomeIcon icon={faInstagram} />
              Instagram
            </TextLink>
            <TextLink as="a" href="https://www.linkedin.com/company/emcasa" target="_blank">
              <FontAwesomeIcon icon={faLinkedin} />
              LinkedIn
            </TextLink>
            <TextLink as="a" href="https://twitter.com/EmCasaTech" target="_blank">
              <FontAwesomeIcon icon={faTwitter} />
              Twitter
            </TextLink>
          </LinksItem>
        </LinksContainer>
      </Container>
    </Wrapper>
  </ThemeProvider>
)

export default Footer
