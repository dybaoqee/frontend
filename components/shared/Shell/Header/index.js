import {Component, Fragment} from 'react'
import Link from 'next/link'

import Container, {Button, Nav, Error} from './styled'

export default class Header extends Component {
  state = {
    isMobileNavVisible: false
  }

  toggleMobileNavVisibility = () => {
    const newState = !this.state.isMobileNavVisible
    this.setState({isMobileNavVisible: newState})
  }

  renderNav() {
    const {authenticated, errorCode} = this.props
    const {isMobileNavVisible} = this.state

    return (
      <Fragment>
        <Button onClick={this.toggleMobileNavVisibility}>☰</Button>

        <Nav visible={isMobileNavVisible}>
          {authenticated && (
            <Link href="/listings/new" as="/imoveis/adicionar">
              <a>Adicionar Imóvel</a>
            </Link>
          )}

          <Link href="/indique">
            <a>Indique e Ganhe</a>
          </Link>

          <Link href="/jobs">
            <a>Trabalhe Conosco</a>
          </Link>

          {authenticated && (
            <Link href="/auth/logout">
              <a>Logout</a>
            </Link>
          )}
        </Nav>
      </Fragment>
    )
  }

  render() {
    const {authenticated, errorCode} = this.props

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
        {errorCode ? <Error>{errorCode}</Error> : this.renderNav()}
      </Container>
    )
  }
}
