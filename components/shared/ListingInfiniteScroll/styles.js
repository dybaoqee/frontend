import styled from 'styled-components'
import Row from '@emcasa/ui-dom/components/Row'
import View from '@emcasa/ui-dom/components/View'
import {themeGet} from 'styled-system'
import {MIN_CARD_WIDTH} from 'components/listings/shared/ListingCard/styles'

const Container = styled(View)`
  padding: 0 ${themeGet('space.4')}px ${themeGet('space.4')}px;
`

const ListContainer = styled(Row)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${MIN_CARD_WIDTH}px, 1fr));
  grid-gap: ${themeGet('space.4')}px;
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
