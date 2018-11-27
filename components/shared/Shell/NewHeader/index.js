import {ThemeProvider} from 'styled-components'
import Link from 'next/link'
import theme from '@emcasa/ui'
import {Component} from 'react'
import Text from '@emcasa/ui-dom/components/Text'
import AccountKit from 'components/shared/Auth/AccountKit'
import Container, {Wrapper, Nav, MenuItem, Logo} from './styles'


export default class Header extends Component {
  render() {
    const {transparent, authenticated} = this.props
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Container transparent={transparent}>
            <Link href="/">
              <Logo alt="EmCasa Imobiliária no Rio de Janeiro e São Paulo" />
            </Link>
            <Nav>
              <Link href="/">
                <MenuItem>
                  <Text>Comprar</Text>
                </MenuItem>
              </Link>
              <Link href="/vender">
                <MenuItem active={true}>
                  <Text>Vender</Text>
                </MenuItem>
              </Link>
              {authenticated && (
                <Link href="/meu-perfil">
                  <MenuItem active={true}>
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
