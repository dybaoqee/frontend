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
        <Link href="/login">
          <EmCasaButton light>Entrar</EmCasaButton>
        </Link>

        <Link href="/signup">
          <EmCasaButton>Criar conta</EmCasaButton>
        </Link>
      </UserHeader>
    ) : (
      <Link href="/auth/logout">
        <a>Sair</a>
      </Link>
    )
  }

  renderNav() {
    const {authenticated} = this.props
    const {isMobileNavVisible} = this.state
    return (
      <Fragment>
        <Button onClick={this.toggleMobileNavVisibility}>☰</Button>

        <Nav visible={isMobileNavVisible}>
          <Link href="/listings/new" as="/imoveis/adicionar">
            <a>Venda seu Imóvel</a>
          </Link>

          <Link href="/indique">
            <a>Indique e Ganhe</a>
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
