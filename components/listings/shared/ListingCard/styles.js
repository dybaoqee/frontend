import styled from 'styled-components'
import {themeGet} from 'styled-system'
import View from '@emcasa/ui-dom/components/View'

const MIN_CARD_WIDTH = 280

const getCardWidth = () => {
  return MIN_CARD_WIDTH
}

const Container = styled(View)`
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  width: ${MIN_CARD_WIDTH}px;
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
    min-height: ${() => Math.round(MIN_CARD_WIDTH * 0.5)}px;
    height: ${() => Math.round(MIN_CARD_WIDTH * 0.5)}px;
    border-radius: ${themeGet('space.1')}px ${themeGet('space.1')}px 0 0;
  }
`

export {
  Container,
  getCardWidth
}
