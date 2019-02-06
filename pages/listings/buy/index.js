import '@emcasa/ui-dom/components/global-styles'
import {Component} from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import {ThemeProvider} from 'styled-components'
import BuyListing from 'components/listings/buy/BuyListing'
import Benefits from 'components/listings/shared/Benefits'
import Neighborhoods from 'components/listings/buy/Neighborhoods'
import {desktopHeaderHeight} from 'constants/dimensions'
import {isMobile} from 'lib/mobile'
import {imageUrl} from 'utils/image_url'
import {
  log,
  BUYER_LANDING_PAGE
} from 'lib/amplitude'
import NextHead from 'components/shared/NextHead'

const Container = styled(View)`
  display: flex;
  flex-direction: column;
`

const Block = styled(View)`
  display: flex;
  flex: 1;
  min-height: 60vh;
  max-width: 100vw;
  overflow: hidden;
  padding-top: ${desktopHeaderHeight}px;
  justify-content: center;
`

const MainBlock = styled(Block)`
  padding-top: 0px;
  min-height: 80vh;
  @media (max-width: ${theme.breakpoints[0]}) {
    min-height: 100vh;
  }
`

const BASE_TITLE = 'Imóveis, Casas e Apartamentos à Venda'
const BASE_DESCRIPTION = 'com o sistema exclusivo de Tour Virtual 3D do Emcasa, a sua startup imobiliária.'

const CONTENT = {
    all: {
      seoImg: imageUrl('buy.jpg'),
      seoTitle: `${BASE_TITLE} no Rio de Janeiro e São Paulo | EmCasa`,
      seoDescription: `Encontre ${BASE_TITLE} no Rio de Janeiro em Ipanema, Leblon, Copacabana, Botafogo, Flamengo, Lagoa e toda Zona Sul ou São Paulo em Perdizes ${BASE_DESCRIPTION}`,
      heroTitle: 'Quer comprar um imóvel?'
    },
    sp: {
      seoImg: imageUrl('buy-sp.jpg'),
      seoTitle: `${BASE_TITLE} em Perdizes, São Paulo | EmCasa`,
      seoDescription: `Encontre ${BASE_TITLE} em Perdizes, São Paulo ${BASE_DESCRIPTION}`,
      heroTitle: 'Quer comprar um imóvel em Perdizes?'
    },
    rj: {
      seoImg: imageUrl('buy-rj.jpg'),
      seoTitle: `${BASE_TITLE} no Rio de Janeiro | EmCasa`,
      seoDescription: `Encontre ${BASE_TITLE} no Rio de Janeiro em Ipanema, Leblon, Copacabana, Botafogo, Flamengo, Lagoa e toda Zona Sul ${BASE_DESCRIPTION}`,
      heroTitle: 'Quer comprar um imóvel na zona sul do Rio de Janeiro?'
    }
}

export default class Buy extends Component {
  static async getInitialProps() {
    return {
      transparentHeader: true,
      newFooter: true,
      newHeader: true
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      pageWidth: process.browser ? window.innerWidth : 0
    }
  }

  onResize = () => {
    this.setState({pageWidth: window.innerWidth})
  }

  componentDidMount() {
    log(BUYER_LANDING_PAGE)
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  render() {
    const {router} = this.props
    const city = (router.query || {}).city || 'all'
    const {seoTitle, seoDescription, seoImg, heroTitle} = CONTENT[city]
    const blockProps = {
      isMobile: isMobile(this.state.pageWidth),
      pageWidth: this.state.pageWidth,
      city
    }

    const benefitsProps = {
      sectionTitle: 'Conheça as vantagens de comprar com a EmCasa',
      benefitsList:  [
        {
          icon: 'suporte-financiamento',
          title: 'Financiamento e FGTS',
          description: 'Tenha suporte para o financiamento do seu imóvel e retirada de FGTS'
        },
        {
          icon: 'tour-3d',
          title: 'Tour Virtual 3D',
          description:
            'Visite dezenas de imóveis sem sair de casa, economize tempo e encontre o imóvel perfeito'
        },
        {
          icon: 'assistencia-juridica',
          title: 'Sem dor de cabeça',
          description:
            'Aqui na EmCasa cuidamos de toda burocracia, contratos e documentação'
        }
      ],
      buttonHref: '/imoveis',
      buttonLabel: 'Explorar Imóveis',
      isMobile: isMobile(this.state.pageWidth)
    }

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <NextHead
            title={seoTitle}
            description={seoDescription}
            imageSrc={seoImg}
            imageWidth={'1476'}
            imageHeight={'838'}
            url={'https://www.emcasa.com/'}
          />
          <MainBlock>
            <BuyListing title={heroTitle} />
          </MainBlock>
          <Block>
            <Benefits {...benefitsProps} />
          </Block>
          <Block>
            <Neighborhoods {...blockProps} />
          </Block>
        </Container>
      </ThemeProvider>
    )
  }
}
