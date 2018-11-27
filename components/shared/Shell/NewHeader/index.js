import {ThemeProvider} from 'styled-components'
import theme from '@emcasa/ui'
import {Component} from 'react'
import Text from '@emcasa/ui-dom/components/Text'
import Container, {Wrapper, Nav, MenuItem, Logo} from './styles'

const MENU_ITEMS = [
  {href: '/', title: 'Comprar'},
  {href: '/vender', title: 'Vender'},
]

export default class Header extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Container transparent={this.props.transparent}>
            <Logo />
            <Nav>
              <MenuItem>
                <Text>Comprar</Text>
              </MenuItem>
              <MenuItem active={true}>
                <Text>Vender</Text>
              </MenuItem>
              <MenuItem>
                <Text>Entrar</Text>
              </MenuItem>
            </Nav>
          </Container>
        </Wrapper>
      </ThemeProvider>
    )
  }
}
