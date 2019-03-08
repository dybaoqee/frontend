import {Component} from 'react'
import styled from 'styled-components'
import {breakpoint} from '@emcasa/ui/lib/styles'
import {withBreakpoint} from '@emcasa/ui-dom/components/Breakpoint'
import View from '@emcasa/ui-dom/components/View'
import SellListing from 'components/listings/sell/SellListing'
import Benefits from 'components/listings/shared/Benefits'
import HowItWorks from 'components/listings/sell/HowItWorks'
import {desktopHeaderHeight} from 'constants/dimensions'
import {
  SchemaWebSite,
  SchemaRealEstateAgent,
  SchemaOrganization
} from 'constants/ld-json'
import {imageUrl} from 'utils/image_url'
import {
  log,
  SELLER_LANDING_PAGE,
  SELLER_LANDING_EXPLORE_LISTINGS
} from 'lib/logging'
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
  @media ${breakpoint.down('tablet')} {
    min-height: 100vh;
  }
`

const BASE_TITLE = 'Anuncie e Venda seu Imóvel'
const BASE_DESCRIPTION =
  'com Emcasa, a startup imobiliária que tem exclusivo sistema de Tour Virtual 3D para aumentar suas chances de venda.'
const CONTENT = {
  all: {
    seoImg: imageUrl('sell'),
    seoTitle: `${BASE_TITLE} no Rio de Janeiro ou São Paulo | EmCasa`,
    seoDescription: `${BASE_TITLE} no Rio de Janeiro ou São Paulo ${BASE_DESCRIPTION}`,
    heroTitle: 'Quer vender seu imóvel?'
  },
  sp: {
    seoImg: imageUrl('sell-sp'),
    seoTitle: `${BASE_TITLE} em Perdizes, São Paulo | EmCasa`,
    seoDescription: `${BASE_TITLE} em Perdizes, São Paulo ${BASE_DESCRIPTION}`,
    heroTitle: 'Quer vender seu imóvel em Perdizes?'
  },
  rj: {
    seoImg: imageUrl('sell-rj'),
    seoTitle: `${BASE_TITLE} no Rio de Janeiro | EmCasa`,
    seoDescription: `${BASE_TITLE} no Rio de Janeiro ${BASE_DESCRIPTION}`,
    heroTitle: 'Quer vender seu imóvel na zona sul do Rio de Janeiro?'
  }
}

const seoBreadcrumb = {
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@id": "http://www.emcasa.com",
        "name": "Página Inicial",
        "url": "http://www.emcasa.com"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@id": "http://www.emcasa.com/vender",
        "name": "Vender imóvel",
        "url": "http://www.emcasa.com/vender"
      }
    }
  ]
}

class Sell extends Component {
  static async getInitialProps() {
    return {
      transparentHeader: true,
      newFooter: true,
      newHeader: true
    }
  }

  constructor(props) {
    super(props)
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
    const {isMobile} = this.props
    const blockProps = {
      isMobile,
      pageWidth: this.state.pageWidth
    }

    const {router} = this.props
    const city = (router.query || {}).city || 'all'
    const {seoTitle, seoDescription, seoImg, heroTitle} = CONTENT[city]

    const benefitsProps = {
      sectionTitle: 'Conheça as vantagens de vender com a EmCasa',
      benefitsList: [
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
      buttonClick: () => {
        log(SELLER_LANDING_EXPLORE_LISTINGS)
      },
      isMobile
    }

    return (
      <Container>
        <NextHead
          title={seoTitle}
          description={seoDescription}
          imageSrc={seoImg}
          imageWidth={'1476'}
          imageHeight={'838'}
          url={'https://www.emcasa.com/vender'}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SchemaWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SchemaRealEstateAgent) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SchemaOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebPage",
            "@id": "https://www.emcasa.com/vender/#webpage",
            "url": "https://www.emcasa.com/vender",
            "name": seoTitle,
            "description": seoDescription,
            "breadcrumb": seoBreadcrumb
          })}}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(seoBreadcrumb)}}
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
    )
  }
}

export default withBreakpoint()(Sell)
