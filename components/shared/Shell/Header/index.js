import {Component, Fragment} from 'react'
import Link from 'next/link'
import EmCasaButton from 'components/shared/Common/Buttons/Rounded'

import Container, {Button, Nav, UserHeader} from './styles'

export default class Header extends Component {
  state = {
    isMobileNavVisible: false
  }

  toggleMobileNavVisibility = () => {
    const newState = !this.state.isMobileNavVisible
    this.setState({isMobileNavVisible: newState})
  }

  getUserHeader = (authenticated) => {
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
      <Fragment>
        <Link href="/listings/fav" as="/imoveis/favoritos">
          <a>Favoritos</a>
        </Link>
        <Link href="/auth/logout">
          <a>Sair</a>
        </Link>
      </Fragment>
    )
  }

  renderNav() {
    const {authenticated} = this.props
    const {isMobileNavVisible} = this.state
    return (
      <Fragment>
        <Button onClick={this.toggleMobileNavVisibility}>☰</Button>

        <Nav visible={isMobileNavVisible}>
          <Link href="/listings" as="/imoveis" prefetch>
            <a>Compre</a>
          </Link>

          <Link
            href="/listings/sell/know-more"
            as="/saiba-mais-para-vender"
            prefetch
          >
            <a>Venda</a>
          </Link>

          <Link href="/indique">
            <a>Indique e Ganhe</a>
          </Link>

          <Link href="http://blog.emcasa.com">
            <a>Blog</a>
          </Link>

          {this.getUserHeader(authenticated)}
        </Nav>
      </Fragment>
    )
  }

  render() {
    return (
      <Container>
        <Link href="/">
          <a className="logo">
            <img
              src="/static/emcasa-imobiliaria-rio-de-janeiro.png"
              alt="Emcasa Imobiliária no Rio de Janeiro"
            />
          </a>
        </Link>
        {this.renderNav()}
      </Container>
    )
  }
}
