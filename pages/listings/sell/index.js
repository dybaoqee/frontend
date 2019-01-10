import '@emcasa/ui-dom/components/global-styles'
import {Component} from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import {ThemeProvider} from 'styled-components'
import SellListing from 'components/listings/sell/SellListing'
import Benefits from 'components/listings/sell/Benefits'
import HowItWorks from 'components/listings/sell/HowItWorks'
import {desktopHeaderHeight} from 'constants/dimensions'
import {isMobile} from 'lib/mobile'
import {imageUrl} from 'utils/image_url'
import {
  log,
  SELLER_LANDING_PAGE
} from 'lib/amplitude'

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

const BASE_TITLE = 'Anuncie e Venda seu imóvel'
const BASE_DESCRIPTION = 'de forma simples e transparente com a EmCasa que tem sistema exclusivo de Tour Virtual 3D para aumentar suas chances de venda'
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

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Head>
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="theme-color" content={theme.colors.pink} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImg} />
            <meta property="og:image:height" content="838" />
            <meta property="og:image:width" content="1476" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={seoImg} />
          </Head>
          <MainBlock>
            <SellListing title={heroTitle} />
          </MainBlock>
          <Block>
            <Benefits {...blockProps} />
          </Block>
          <Block>
            <HowItWorks {...blockProps} />
          </Block>
        </Container>
      </ThemeProvider>
    )
  }
}
