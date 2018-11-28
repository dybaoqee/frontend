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
    align-items: center;
    background-image: url(${CLOUDINARY_URL}/wall-small.jpg);
  }

  @media (max-height: 690px) {
    align-items: center;
    background-image: url(${CLOUDINARY_URL}/wall-small.jpg);
  }
  
  @media only screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1024px)  {
    align-items: center;
    background-image: url(${CLOUDINARY_URL}/wall-small.jpg);
  }
  
  @media (min-width: 1500px) {
    align-items: center;
    margin-top: -20vh;
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
