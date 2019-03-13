import {Component} from 'react'
import theme from '@emcasa/ui'
import {ThemeProvider} from 'styled-components'
import styled from 'styled-components'
import {breakpoint} from '@emcasa/ui/lib/styles'
import {withBreakpoint} from '@emcasa/ui-dom/components/Breakpoint'
import View from '@emcasa/ui-dom/components/View'
import Benefits from 'components/listings/shared/Benefits'
import NextHead from 'components/shared/NextHead'
import ScrollTracker from 'components/shared/ScrollTracker'
import NewListing from 'components/listings/new-listing'
import {
  SchemaWebSite,
  SchemaRealEstateAgent,
  SchemaOrganization
} from 'constants/ld-json'
import {imageUrl} from 'utils/image_url'
import {
  log,
  SELLER_LANDING_PAGE,
  SELLER_LANDING_EXPLORE_LISTINGS,
  SELLER_LANDING_SCROLL_25,
  SELLER_LANDING_SCROLL_50,
  SELLER_LANDING_SCROLL_75,
  SELLER_LANDING_SCROLL_100
} from 'lib/logging'
import {
  Container,
  Block,
  MainBlock
} from './styles'

const BASE_TITLE = 'Descubra agora por quanto vender seu imóvel'
const BASE_DESCRIPTION =
  'com Emcasa, a startup imobiliária que tem exclusivo sistema de Tour Virtual 3D para aumentar suas chances de venda.'
const CONTENT = {
  all: {
    seoImg: imageUrl('sell'),
    seoTitle: `${BASE_TITLE} no Rio de Janeiro ou São Paulo | EmCasa`,
    seoDescription: `${BASE_TITLE} no Rio de Janeiro ou São Paulo ${BASE_DESCRIPTION}`,
    heroTitle: 'Descubra agora por quanto vender seu imóvel'
  },
  sp: {
    seoImg: imageUrl('sell-sp'),
    seoTitle: `${BASE_TITLE} em São Paulo | EmCasa`,
    seoDescription: `${BASE_TITLE} em São Paulo ${BASE_DESCRIPTION}`,
    heroTitle: 'Descubra agora por quanto vender seu imóvel em São Paulo'
  },
  rj: {
    seoImg: imageUrl('sell-rj'),
    seoTitle: `${BASE_TITLE} no Rio de Janeiro | EmCasa`,
    seoDescription: `${BASE_TITLE} no Rio de Janeiro ${BASE_DESCRIPTION}`,
    heroTitle: 'Descubra agora por quanto vender seu imóvel na zona sul do Rio de Janeiro'
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
    this.onChangeStep = this.onChangeStep.bind(this)
    this.state = {
      hideFooter: false,
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

  onChangeStep(step) {
    if (step === 'intro') {
      this.showFooter()
    } else {
      this.hideFooter()
    }
  }

  showFooter() {
    const footer = document.getElementsByTagName('address')[0]
    footer.style.display = 'block'
  }

  hideFooter() {
    const footer = document.getElementsByTagName('address')[0]
    footer.style.display = 'none'
  }

  render() {
    const { isMobile, user, client } = this.props
    const blockProps = {
      isMobile,
      pageWidth: this.state.pageWidth
    }

    const {router} = this.props
    const city = (router.query || {}).city || 'all'
    const {seoTitle, seoDescription, seoImg, heroTitle} = CONTENT[city]

    const benefitsProps = {
      sectionTitle: 'Aumente as chances de vender com o Tour Virtual',
      benefitsList: [
        {
          description:
            'Mais compradores visitam seu imóvel virtualmente.'
        },
        {
          description:
            'Visitas físicas apenas com compradores realmente interessados.'
        },
        {
          description:
            'Nossos especialistas irão acompanhar as visitas pessoalmente.'
        }
      ],
      buttonHref: '/vender',
      buttonLabel: 'Conheça mais a EmCasa',
      buttonClick: () => {
        log(SELLER_LANDING_EXPLORE_LISTINGS)
      },
      isMobile,
      showTour: true
    }

    return (
      <Container>
        <ScrollTracker
          onScroll25={() => {log(SELLER_LANDING_SCROLL_25)}}
          onScroll50={() => {log(SELLER_LANDING_SCROLL_50)}}
          onScroll75={() => {log(SELLER_LANDING_SCROLL_75)}}
          onScroll100={() => {log(SELLER_LANDING_SCROLL_100)}}
        />
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
          <NewListing
            client={client}
            user={user}
            title={heroTitle}
            onChangeStep={this.onChangeStep}
          />
        </MainBlock>
      </Container>
    )
  }
}

export default withBreakpoint()(Sell)
