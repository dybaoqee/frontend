import styled from 'styled-components'
import { themeGet } from 'styled-system'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import { MAP_WIDTH_PERCENT } from 'components/listings/shared/ListingList/styles'

const MIN_CARD_WIDTH = 300

const THUMB_WIDTH = 308
const THUMB_HEIGHT = 165
const CARD_MARGIN = theme.space[4]

const getCardWidth = () => {
  const containerWidth = window.innerWidth
  // Two margins (each corner of the document: left of list, right of map)
  const pageMargins = CARD_MARGIN * 2

  // Map width to be discounted
  const mapWidth = (containerWidth) * (MAP_WIDTH_PERCENT / 100)

  // Calculated area to fit cards (in one row)
  const cardsArea = containerWidth - mapWidth - pageMargins

  // How many cards, minimum, can fit in this row?
  const cardsPerRow = Math.floor(cardsArea / MIN_CARD_WIDTH)
  return cardsArea / cardsPerRow - (CARD_MARGIN)
}

const Container = styled(View)`
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  width: ${() => getCardWidth()}px;
  height: auto;
  border: 1px solid ${themeGet('colors.lightGrey')};
  border-radius: ${themeGet('space.1')}px;
  margin: 0 ${themeGet('space.4')}px ${themeGet('space.4')}px 0;

  : hover {
    border: 1px solid ${themeGet('colors.pink')};
  }
`

const ListingImage = styled(View)`
  box-sizing: border-box;
  background-image: ${({url}) => `url('${url}')`};
  background-repeat: no-repeat;
  background-size: cover;
  width: ${THUMB_WIDTH}px;
  height: ${THUMB_HEIGHT}px;
  border-radius: ${themeGet('space.1')}px ${themeGet('space.1')}px 0 0;
`

const LikeButtonContainer = styled.div`
  position: absolute;
  right: ${themeGet('space.2')}px;
  top: ${themeGet('space.2')}px;
`

export {
  Container,
  ListingImage,
  LikeButtonContainer,
  THUMB_WIDTH,
  THUMB_HEIGHT
}
