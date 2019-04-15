import styled from 'styled-components'
import {themeGet} from 'styled-system'
import View from '@emcasa/ui-dom/components/View'
import {
  shouldShowMap,
  MAP_WIDTH_PERCENT
} from 'components/listings/shared/ListingList/styles'

const MIN_CARD_WIDTH = 280
const CARD_MARGIN = themeGet('space.4')

const getCardWidth = (props) => {
  if (!process.browser) {
    return
  }

  const cardMargin = CARD_MARGIN(props)
  const clientWidth = Math.floor(document.documentElement.clientWidth)
  // Two margins (each corner of the document: left of list, right of map)
  const pageMargins = cardMargin * 2

  // Map width to be discounted
  const showMap = shouldShowMap()
  const mapWidth = showMap
    ? Math.ceil(clientWidth * (MAP_WIDTH_PERCENT / 100))
    : 0

  // Calculated area to fit cards (in one row)
  const cardsArea =
    clientWidth - mapWidth - pageMargins + (showMap ? 0 : cardMargin)

  // How many cards, minimum, can fit in this row?
  const cardsPerRow = Math.floor(cardsArea / (MIN_CARD_WIDTH + cardMargin))
  return cardsArea / cardsPerRow - cardMargin
}

const Container = styled(View)`
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  width: ${(props) => getCardWidth(props)}px;
  height: auto;
  border: 1px solid ${themeGet('colors.lightGrey')};
  border-radius: ${themeGet('space.1')}px;
  margin: 0 ${themeGet('space.4')}px ${themeGet('space.4')}px 0;

  :hover {
    border-color: ${themeGet('colors.pink')};
    box-shadow: 0 0 2px ${themeGet('colors.pink')};
  }

  img {
    box-sizing: border-box;
    object-fit: cover;
    width: 100%;
    min-height: ${(props) => Math.round(getCardWidth(props) * 0.5)}px;
    height: ${(props) => Math.round(getCardWidth(props) * 0.5)}px;
    border-radius: ${themeGet('space.1')}px ${themeGet('space.1')}px 0 0;
  }
`

export {Container, getCardWidth}
