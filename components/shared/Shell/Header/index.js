import {Component, Fragment} from 'react'
import Link from 'next/link'

import EmCasaButton from 'components/shared/Common/Buttons/Rounded'
import UserMenu from './UserMenu'
import PhoneHeader from 'components/shared/Shell/Header/PhoneHeader'
import Container, {Button, Nav, UserHeader, Wrapper, MenuItem, Logo} from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-pro-light/faSearch'
import faTag from '@fortawesome/fontawesome-pro-light/faTag'
import faHeart from '@fortawesome/fontawesome-pro-light/faHeart'
import faChart from '@fortawesome/fontawesome-pro-light/faChartBar'
import AccountKit from 'components/shared/Auth/AccountKit'
import {getCookie, setCookie} from 'lib/session'

import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'
import Text from '@emcasa/ui-dom/components/Text'
import Icon from '@emcasa/ui-dom/components/Icon'
import * as colors from 'constants/colors'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isMobileNavVisible: false
    }
  }

  toggleMobileNavVisibility = () => {
    const {isMobileNavVisible} = this.state
    this.setState({isMobileNavVisible: !isMobileNavVisible})
  }

  componentDidMount() {
    const accountkitinit = getCookie('accountkitinit')
    this.setState({accountkitinit})
  }

  getUserHeader = (authenticated) => {
    const {user, notifications} = this.props
    const {accountkitinit} = this.state

    const userMenu = [
      {
        title: 'Meu perfil',
        href: '/user/profile',
        as: '/meu-perfil'
      },
      {
        title: 'Meus imóveis',
        href: '/listings/user-listings',
        as: '/meus-imoveis'
      },
      {
        title: 'Imóveis ocultados',
        href: '/listings/blacklisted',
        as: '/imoveis-ocultados'
      },
      {title: 'Sair', href: '/auth/logout'}
    ]
    return !authenticated || accountkitinit ? (
      <UserHeader authenticated={authenticated}>
        <AccountKit
          appId={process.env.FACEBOOK_APP_ID}
          appSecret={process.env.ACCOUNT_KIT_APP_SECRET}
          version="v1.0"
        >
          {({signIn, loading}) => (
            <EmCasaButton onClick={signIn} disabled={loading}>
              Entrar
            </EmCasaButton>
          )}
        </AccountKit>
      </UserHeader>
    ) : (
      <UserMenu notifications={notifications} user={user} items={userMenu} />
    )
  }

  renderNav() {
    const {authenticated, isAdmin, router} = this.props
    const {isMobileNavVisible} = this.state

    const menuItems = [
      {
        href: '/listings',
        as: '/imoveis',
        icon: faSearch,
        title: 'Buscar Imóveis',
        newTitle: 'Comprar'
      },
      {
        href: '/listings/sell/know-more',
        as: '/saiba-mais-para-vender',
        icon: faTag,
        title: 'Quero anunciar',
        newTitle: 'Vender'
      },
      {
        href: '/listings/fav',
        as: '/imoveis/favoritos',
        icon: faHeart,
        title: 'Favoritos',
        auth: true
      },
      {
        href: '/dashboard',
        as: '/dashboard',
        icon: faChart,
        title: 'Painel',
        admin: true
      },
      {
        href: '/listings/sell/know-more',
        as: '/saiba-mais-para-vender',
        newIcon: 'phone'
      }
    ]
    return (
      <>
        <Button onClick={this.toggleMobileNavVisibility}>☰</Button>
        <Nav visible={isMobileNavVisible}>
          {menuItems.map(({href, as, icon, title, newTitle, newIcon, auth, admin}) => {
            if (
              (auth && authenticated) ||
              (admin && isAdmin) ||
              (!auth && !admin)
            ) {

              return (
                <Link href={href} as={as} key={title}>
                  <a>
                    <MenuItem
                      active={router && href === router.route}
                      isIcon={!!icon}
                    >
                      {icon && <FontAwesomeIcon icon={icon} />}
                      <span
                        style={{color: colors.blue.dark}}
                      >
                          {title}
                        </span>
                    </MenuItem>
                  </a>
                </Link>
              )
            }
          })}
          {this.getUserHeader(authenticated, isAdmin)}
        </Nav>
      </>
    )
  }

  render() {
    const {
      router,
      hideSeparator,
      transparent
    } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          {router && router.route === '/' && <PhoneHeader />}
          <Container hideSeparator={hideSeparator} transparent={transparent}>
            <Link href="/">
              <a>
                <Logo
                  alt="Emcasa Imobiliária no Rio de Janeiro"
                />
              </a>
            </Link>
            {this.renderNav()}
          </Container>
        </Wrapper>
      </ThemeProvider>
    )
  }
}
