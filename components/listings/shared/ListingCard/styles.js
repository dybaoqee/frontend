import styled, {createGlobalStyle} from 'styled-components'
import {themeGet} from 'styled-system'
import View from '@emcasa/ui-dom/components/View'

const MIN_CARD_WIDTH = 280

const Container = styled(View)`
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  height: auto;
  border: 1px solid ${themeGet('colors.lightGrey')};
  border-radius: ${themeGet('space.1')}px;
  background-color: ${themeGet('colors.white')};

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
  MIN_CARD_WIDTH
}
