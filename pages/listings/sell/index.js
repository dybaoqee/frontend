import '@emcasa/ui-dom/components/global-styles'
import {Component} from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import {ThemeProvider} from 'styled-components'
import SellListing from 'components/listings/sell/SellListing'
import Benefits from 'components/listings/shared/Benefits'
import HowItWorks from 'components/listings/sell/HowItWorks'
import {desktopHeaderHeight} from 'constants/dimensions'
import {isMobile} from 'lib/mobile'
import {imageUrl} from 'utils/image_url'
import {
  log,
  SELLER_LANDING_PAGE
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
  justify-content: center;
  padding-top: ${desktopHeaderHeight}px;
`

const MainBlock = styled(Block)`
  padding-top: 0px;
  min-height: 80vh;
  @media (max-width: ${theme.breakpoints[0]}) {
    min-height: 100vh;
  }
`

const BASE_TITLE = 'Anuncie e Venda seu Imóvel'
const BASE_DESCRIPTION = 'com Emcasa, a startup imobiliária que tem exclusivo sistema de Tour Virtual 3D para aumentar suas chances de venda.'
const CONTENT = {
    all: {
      seoImg: imageUrl('sell.jpg'),
      seoTitle: `${BASE_TITLE} no Rio de Janeiro ou São Paulo | EmCasa`,
      seoDescription: `${BASE_TITLE} no Rio de Janeiro ou São Paulo ${BASE_DESCRIPTION}`,
      heroTitle: 'Quer vender seu imóvel?'
    },
    sp: {
      seoImg: imageUrl('sell-sp.jpg'),
      seoTitle: `${BASE_TITLE} em Perdizes, São Paulo | EmCasa`,
      seoDescription: `${BASE_TITLE} em Perdizes, São Paulo ${BASE_DESCRIPTION}`,
      heroTitle: 'Quer vender seu imóvel em Perdizes?'
    },
    rj: {
      seoImg: imageUrl('sell-rj.jpg'),
      seoTitle: `${BASE_TITLE} no Rio de Janeiro | EmCasa`,
      seoDescription: `${BASE_TITLE} no Rio de Janeiro ${BASE_DESCRIPTION}`,
      heroTitle: 'Quer vender seu imóvel na zona sul do Rio de Janeiro?'
    }
}

export default class Sell extends Component {
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
    log(SELLER_LANDING_PAGE)
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  render() {
    const blockProps = {
      isMobile: isMobile(this.state.pageWidth),
      pageWidth: this.state.pageWidth
    }

    const {router} = this.props
    const city = (router.query || {}).city || 'all'
    const {seoTitle, seoDescription, seoImg, heroTitle} = CONTENT[city]

    const benefitsProps = {
      sectionTitle: 'Conheça as vantagens de vender com a EmCasa',
      benefitsList:  [
        {
          icon: 'tour-3d',
          title: 'Tour Virtual 3D',
          description:
            'Atraia mais compradores interessados no seu imóvel com Tour 3D'
        },
        {
          icon: 'avaliacao-precisa',
          title: 'Avaliação online',
          description:
            'Nossa avaliação online é precisa de acordo com os valores de mercado da sua região'
        },
        {
          icon: 'assistencia-juridica',
          title: 'Sem dor de cabeça',
          description:
            'Aqui na EmCasa cuidamos de toda burocracia, contratos e documentação'
        }
      ],
      buttonHref: '/vender/imovel',
      buttonLabel: 'Conheça mais a EmCasa',
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
            url={'https://www.emcasa.com/vender'}
          />
          <MainBlock>
            <SellListing title={heroTitle} />
          </MainBlock>
          <Block>
            <Benefits {...benefitsProps} />
          </Block>
          <Block>
            <HowItWorks {...blockProps} />
          </Block>
        </Container>
      </ThemeProvider>
    )
  }
}
