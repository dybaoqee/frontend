import styled from 'styled-components'
import Row from '@emcasa/ui-dom/components/Row'
import View from '@emcasa/ui-dom/components/View'
import { themeGet } from 'styled-system'

const Container = styled(View)`
  padding: ${themeGet('space.4')}px;
`

const ListContainer = styled(Row)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 980px;
`

const Footer = styled.footer`
  width: 100%;
  box-sizing: border-box;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  font-size: 0.7em;
  background-color: ${themeGet('colors.white')};
  cursor: pointer;
  a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 25px;
    color: inherit;
    text-decoration: none;
    box-sizing: border-box;
  }
`

export {
  Container,
  ListContainer,
  Footer
}
