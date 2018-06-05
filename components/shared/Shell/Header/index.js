import {Component, Fragment} from 'react'
import Link from 'next/link'
import EmCasaButton from 'components/shared/Common/Buttons/Rounded'
import UserMenu from './UserMenu'
import PhoneHeader from 'components/shared/Shell/Header/PhoneHeader'
import Container, {Button, Nav, UserHeader, Wrapper, MenuItem} from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-pro-light/faSearch'
import faTag from '@fortawesome/fontawesome-pro-light/faTag'
import faHeart from '@fortawesome/fontawesome-pro-light/faHeart'
import faEnvelope from '@fortawesome/fontawesome-pro-light/faEnvelope'
import faChart from '@fortawesome/fontawesome-pro-light/faChartBar'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isMobileNavVisible: false
    }
  }

  toggleMobileNavVisibility = () => {
    const newState = !this.state.isMobileNavVisible
    this.setState({isMobileNavVisible: newState})
  }

  getUserHeader = (authenticated) => {
    const {user, notifications} = this.props
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
      {title: 'Sair', href: '/auth/logout'}
    ]
    return !authenticated ? (
      <UserHeader authenticated={authenticated}>
        <Link href="/auth/login" as="/login">
          <EmCasaButton light>Entrar</EmCasaButton>
        </Link>

        <Link href="/auth/signup" as="/signup">
          <EmCasaButton>Criar conta</EmCasaButton>
        </Link>
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
        title: 'Anunciar'
      },
      {
        href: '/listings/fav',
        as: '/imoveis/favoritos',
        icon: faHeart,
        title: 'Favoritos',
        auth: true
      },
      {
        href: '/user/messages',
        as: '/mensagens',
        icon: faEnvelope,
        title: 'Mensagens',
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
                <Link href={href} as={as} prefetch key={title}>
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
    const {router} = this.props
    return (
      <Wrapper>
        {router && router.asPath === '/' && <PhoneHeader />}
        <Container>
          <Link href="/" prefetch>
            <a className="logo">
              <img
                src="/static/emcasa-imobiliaria-rio-de-janeiro.png"
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
