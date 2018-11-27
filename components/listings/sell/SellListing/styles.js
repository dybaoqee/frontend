import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import {desktopHeaderHeight} from 'constants/dimensions'

const CLOUDINARY_URL = 'https://res.cloudinary.com/emcasa/image/upload/fl_any_format/v1542831121/background'

const UnderlinedText = styled(Text)`
  text-decoration: underline;
  cursor: pointer;
`

const Container = styled(View)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: stretch;
  background-image: url(${CLOUDINARY_URL}/wall-large.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;

  @media (max-width: ${theme.breakpoints[0]}){
    background-image: url(${CLOUDINARY_URL}/wall-small.jpg);
  }

  @media (min-aspect-ratio: 2 / 1) {
    background-image: url(${CLOUDINARY_URL}/wall-small.jpg);
  }
`

const Content = styled(View)`
  max-width: 100%;
  margin-top: ${desktopHeaderHeight}px;
`

export {
  UnderlinedText,
  Container,
  Content
}
