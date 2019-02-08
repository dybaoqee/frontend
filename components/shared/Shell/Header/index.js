import Link from 'next/link'
import {Component} from 'react'
import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import AccountKit from 'components/shared/Auth/AccountKit'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-pro-solid/faSearch'
import faFlag from '@fortawesome/fontawesome-pro-solid/faFlag'
import faUser from '@fortawesome/fontawesome-pro-solid/faUser'
import faSignInAlt from '@fortawesome/fontawesome-pro-solid/faSignInAlt'
import NeighborhoodPicker from 'components/shared/NeighborhoodPicker'
import NeighborhoodAutoComplete from 'components/shared/NeighborhoodAutoComplete'
import MobileAddressButton from 'components/shared/MobileAddressButton'
import {MobileTypeaheadContainer} from 'components/shared/NeighborhoodAutoComplete/styles'
import {isMobile} from 'lib/mobile'
import {USE_NEW_SEARCH} from 'config/globals'
import theme from 'config/theme'
import {
  log,
  LANDING_LOGIN
} from 'lib/logging'
import Container, {
  Wrapper,
  Nav,
  Overlay,
  CloseNavButton,
  NavButton,
  MenuItem,
  Logo,
  ShortLogo,
  Search,
  SearchWrapper,
  LabelLogo
} from './styles'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sticky: false,
      isMobileNavVisible: false,
      showFullScreenSearch: false
    }
  }

  onScroll = () => {
    this.setState({sticky: window.scrollY > 100})
  }

  openMobileSearch = () => {
    this.setState({
      showFullScreenSearch: true
    })
  }

  closeMobileSearch = () => {
    this.setState({
      showFullScreenSearch: false
    })
  }

  toggleMobileNavVisibility = () => {
    const {isMobileNavVisible} = this.state
    this.setState({isMobileNavVisible: !isMobileNavVisible})
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWilUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  renderSearch() {
    if (USE_NEW_SEARCH) {
      return (
        <NeighborhoodPicker
          onClick={isMobile() ? this.openMobileSearch : () => {}}
          query={this.props.router.query}
        />
      )
    }

    const height = isMobile() ? 'tall' : 'medium'
    return (
      <Search>
        {isMobile() ? <MobileAddressButton
          address="Bairro ou Cidade"
          onClick={this.openMobileSearch}
          height={isMobile}
        /> :
          <NeighborhoodAutoComplete height={height} />
        }
      </Search>
    )
  }

  renderFullScreenSearch() {
    return (
      <MobileTypeaheadContainer justifyContent="center" p={4}>
        <Col width={1}>
          {USE_NEW_SEARCH ?
            <NeighborhoodPicker
              mobile
              fullscreen
              onBackPressed={this.closeMobileSearch}
              query={this.props.router.query}
            />
            :
            <NeighborhoodAutoComplete
              onBackPressed={this.closeMobileSearch}
              onClearInput={() => {}}
              height={isMobile() ? 'tall' : 'medium'}
            />
          }
        </Col>
      </MobileTypeaheadContainer>
    )
  }

  render() {
    const {transparent, authenticated, search, router} = this.props
    const {sticky, isMobileNavVisible, showFullScreenSearch} = this.state
    const currentPath = router.asPath

    if (showFullScreenSearch) {
      return (this.renderFullScreenSearch())
    }

    return (
      <Wrapper>
        <Container transparent={transparent} className={sticky && !search ? 'sticky' : null} search={search}>
          <Row alignItems="center" width={[1, 1/2]} style={!search ? {height: theme.buttonHeight[1]} : null}>
            <Link passHref href="/listings/buy" as="/">
              <a>
                <h1 style={{zIndex: 1}}>
                  {!search && <Logo alt="EmCasa Imobiliária no Rio de Janeiro e São Paulo" />}
                  {search && <ShortLogo alt="EmCasa Imobiliária no Rio de Janeiro e São Paulo" />}
                  <LabelLogo>EmCasa Imobiliária no Rio de Janeiro e São Paulo</LabelLogo>
                </h1>
              </a>
            </Link>
            <SearchWrapper>
              {search && this.renderSearch()}
            </SearchWrapper>
            {isMobileNavVisible && <Overlay onClick={this.toggleMobileNavVisibility} />}
            <NavButton
              visible={!isMobileNavVisible && !search}
              onClick={this.toggleMobileNavVisibility}
            >
              ☰
            </NavButton>
          </Row>
          <Col width={[0, 1/2]}>
            <Nav visible={isMobileNavVisible}>
              <CloseNavButton
                visible={isMobileNavVisible}
                onClick={this.toggleMobileNavVisibility} />
              <Link passHref href="/listings" as="/imoveis">
                <a>
                  <MenuItem className={router.route === '/listings' ? 'active' :  null}>
                    <FontAwesomeIcon icon={faSearch} className="icon" />
                    <Text>Comprar</Text>
                  </MenuItem>
                </a>
              </Link>
              <Link passHref href="/vender">
                <a>
                  <MenuItem className={currentPath.startsWith('/vender') ? 'active' :  null}>
                    <FontAwesomeIcon className="icon" icon={faFlag} />
                    <Text>Vender</Text>
                  </MenuItem>
                </a>
              </Link>
              {authenticated && (
                <Link passHref href="/meu-perfil">
                  <a>
                    <MenuItem className={currentPath.startsWith('/meu-perfil') ? 'active' :  null}>
                      <FontAwesomeIcon className="icon" icon={faUser} />
                      <Text>Meu Perfil</Text>
                    </MenuItem>
                  </a>
                </Link>
              )}
              {!authenticated && (<AccountKit
                appId={process.env.FACEBOOK_APP_ID}
                appSecret={process.env.ACCOUNT_KIT_APP_SECRET}
                version="v1.0"
              >
                {({signIn, loading}) => (
                  <MenuItem onClick={() => {
                    log(LANDING_LOGIN)
                    signIn()
                  }}>
                    <FontAwesomeIcon className="icon" icon={faSignInAlt} />
                    <Text>Entrar</Text>
                  </MenuItem>
                )}
              </AccountKit>)}
            </Nav>
          </Col>
        </Container>
      </Wrapper>
    )
  }
}
