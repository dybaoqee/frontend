import styled from 'styled-components'
import { themeGet } from 'styled-system'
import View from '@emcasa/ui-dom/components/View'

const THUMB_WIDTH = 308
const THUMB_HEIGHT = 165

const Container = styled(View)`
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  width: 310px;
  height: auto;
  border: 1px solid ${themeGet('colors.lightGrey')};
  border-radius: ${themeGet('space.1')}px;
  margin-bottom: ${themeGet('space.2')}px;

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
