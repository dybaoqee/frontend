import {ThemeProvider} from 'styled-components'
import Link from 'next/link'
import theme from '@emcasa/ui'
import {Component} from 'react'
import Text from '@emcasa/ui-dom/components/Text'
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
import {MobieTypeaheadContainer} from 'components/shared/NeighborhoodAutoComplete/styles'
import {isMobile} from 'lib/mobile'

import Container, {
  Wrapper,
  Nav,
  Overlay,
  CloseNavButton,
  NavButton,
  MenuItem,
  Logo,
  ShortLogo,
  Search
} from './styles'


export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sticky: false,
      isMobileNavVisible: false,
      showMobileSearch: false
    }
  }

  onScroll = () => {
    this.setState({sticky: window.scrollY > 100})
  }

  openMobileSearch = () => {
    this.setState({
      showMobileSearch: true
    })
  }

  closeMobileSearch = () => {
    this.setState({
      showMobileSearch: false
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
    const height = isMobile() ? 'tall' : 'medium'
    return (
      <Search>
        {isMobile() ? <MobileAddressButton
          address="Bairro ou Cidade"
          onClick={this.openMobileSearch}
          height={isMobile}
        /> : (
          <>
            <NeighborhoodPicker />
            <NeighborhoodAutoComplete height={height} />
          </>
        )
        }
      </Search>
    )
  }

  renderMobileSearch() {
    return (
      <MobieTypeaheadContainer justifyContent="center" p={4} style={{height: '100%'}}>
        <Col width={1}>
          <NeighborhoodAutoComplete
            onBackPressed={this.closeMobileSearch}
            onClearInput={() => {}}
            height={isMobile() ? 'tall' : 'medium'}
          />
        </Col>
      </MobieTypeaheadContainer>
    )
  }

  render() {
    const {transparent, authenticated, search, router} = this.props
    const {sticky, isMobileNavVisible, showMobileSearch} = this.state
    const currentPath = router.asPath

    if (showMobileSearch) {
      return (
        <ThemeProvider theme={theme}>
          {this.renderMobileSearch()}
        </ThemeProvider>
      )
    }

    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Container transparent={transparent} className={sticky && !search ? 'sticky' : null} search={search}>
            <Link href="/listings/buy" as="/">
              <div>
                {!search && <Logo alt="EmCasa Imobiliária no Rio de Janeiro e São Paulo" />}
                {search && <ShortLogo alt="EmCasa Imobiliária no Rio de Janeiro e São Paulo" />}
              </div>
            </Link>
            {search && this.renderSearch()}
            {isMobileNavVisible && <Overlay onClick={this.toggleMobileNavVisibility} />}
            <NavButton
              visible={!isMobileNavVisible && !search}
              onClick={this.toggleMobileNavVisibility}
            >
              ☰
            </NavButton>
            <Nav visible={isMobileNavVisible}>
              <CloseNavButton
                visible={isMobileNavVisible}
                onClick={this.toggleMobileNavVisibility} />
              <Link href="/listings" as="/imoveis">
                <MenuItem className={router.route === '/listings' ? 'active' :  null}>
                  <FontAwesomeIcon icon={faSearch} className="icon" />
                  <Text>Comprar</Text>
                </MenuItem>
              </Link>
              <Link href="/vender">
                <MenuItem className={currentPath.startsWith('/vender') ? 'active' :  null}>
                  <FontAwesomeIcon className="icon" icon={faFlag} />
                  <Text>Vender</Text>
                </MenuItem>
              </Link>
              {authenticated && (
                <Link href="/meu-perfil">
                  <MenuItem className={currentPath.startsWith('/meu-perfil') ? 'active' :  null}>
                    <FontAwesomeIcon className="icon" icon={faUser} />
                    <Text>Meu Perfil</Text>
                  </MenuItem>
                </Link>
              )}
              {!authenticated && (<AccountKit
                appId={process.env.FACEBOOK_APP_ID}
                appSecret={process.env.ACCOUNT_KIT_APP_SECRET}
                version="v1.0"
              >
                {({signIn, loading}) => (
                  <MenuItem onClick={signIn}>
                    <FontAwesomeIcon className="icon" icon={faSignInAlt} />
                    <Text>Entrar</Text>
                  </MenuItem>
                )}
              </AccountKit>)}
            </Nav>
          </Container>
        </Wrapper>
      </ThemeProvider>
    )
  }
}
