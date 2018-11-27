import {ThemeProvider} from 'styled-components'
import Link from 'next/link'
import theme from '@emcasa/ui'
import {Component} from 'react'
import Text from '@emcasa/ui-dom/components/Text'
import AccountKit from 'components/shared/Auth/AccountKit'
import Container, {Wrapper, Nav, NavButton, MenuItem, Logo} from './styles'


export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sticky: false
    }
  }

  onScroll = () => {
    this.setState({sticky: window.scrollY > 100})
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWilUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  render() {
    const {transparent, authenticated} = this.props
    const {sticky} = this.state

    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Container transparent={transparent} className={sticky ? 'sticky' : null}>
            <Link href="/">
              <Logo alt="EmCasa Imobiliária no Rio de Janeiro e São Paulo" />
            </Link>
            <NavButton onClick={this.toggleMobileNavVisibility}>☰</NavButton>
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
