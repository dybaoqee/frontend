import styled, {createGlobalStyle} from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'

const MIN_CARD_WIDTH = 280
const LISTING_CARD_IMAGE_HEIGHT = 140

const Wrapper = styled.article`
  position: relative;
  width: 100%;

  > button {
    z-index: 2;

    svg {
      transition: transform .5s cubic-bezier(.4, .2, 0, 1);
    }

    &:hover {
      svg {
        transform: scale(1.12);
      }
    }
  }
`

const Container = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  border: 1px solid ${theme.colors.lightGrey};
  border-radius: ${theme.space[2]}px;
  background-color: ${theme.colors.white};
  transition: border .25s, box-shadow .25s ease-in;

  :hover {
    border-color: ${theme.colors.pink};
    box-shadow: 0 0 2px ${theme.colors.pink};
  }

  img {
    box-sizing: border-box;
    object-fit: cover;
    width: 100%;
    height: ${LISTING_CARD_IMAGE_HEIGHT}px;
    border-radius: ${theme.space[2]}px ${theme.space[2]}px 0 0;
  }
`

export {
  Wrapper,
  Container,
  MIN_CARD_WIDTH,
  LISTING_CARD_IMAGE_HEIGHT
}
