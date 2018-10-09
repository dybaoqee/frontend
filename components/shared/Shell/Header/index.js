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
        title: 'Buscar Imóveis'
      },
      {
        href: '/listings/sell/know-more',
        as: '/saiba-mais-para-vender',
        icon: faTag,
        title: 'Quero anunciar'
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
      }
    ]
    return (
      <Fragment>
        <Button onClick={this.toggleMobileNavVisibility}>☰</Button>

        <Nav visible={isMobileNavVisible}>
          {menuItems.map(({href, as, icon, title, auth, admin}) => {
            if (
              (auth && authenticated) ||
              (admin && isAdmin) ||
              (!auth && !admin)
            ) {
              return (
                <Link href={href} as={as} key={title}>
                  <a>
                    <MenuItem active={router && href === router.route}>
                      <FontAwesomeIcon icon={icon} />
                      <span>{title}</span>
                    </MenuItem>
                  </a>
                </Link>
              )
            }
          })}

          {this.getUserHeader(authenticated, isAdmin)}
        </Nav>
      </Fragment>
    )
  }

  render() {
    const {
      router,
      hideSeparator,
      shortLogo
    } = this.props

    return (
      <Wrapper>
        {router && router.route === '/' && <PhoneHeader />}
        <Container hideSeparator={hideSeparator}>
          <Link href="/">
            <a>
              <Logo
                shortLogo={shortLogo}
                alt="Emcasa Imobiliária no Rio de Janeiro"
              />
            </a>
          </Link>
          {this.renderNav()}
        </Container>
      </Wrapper>
    )
  }
}
