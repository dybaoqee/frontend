import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'

const CLOUDINARY_URL = 'https://res.cloudinary.com/emcasa/image/upload/fl_any_format/v1542831121/background'

export const SofaContainer = styled(View)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: stretch;
  ${({showBackground}) => showBackground && `
    background-image: url(${CLOUDINARY_URL}/wall-large);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;

    @media (max-width: ${theme.breakpoints[0]}){
      background-image: url(${CLOUDINARY_URL}/wall-small);
    }

    @media (min-width: ${theme.breakpoints[0]}){
      @media (max-height: 590px) {
        align-items: center;
        background-image: url(${CLOUDINARY_URL}/wall-small);
      }

      @media (max-width: 1300px) {
        align-items: center;
        margin-top: -20vh;
      }

      @media (min-width: 1500px) {
        align-items: center;
        margin-top: -40vh;
      }
    }

    @media only screen
      and (min-device-width : 768px)
      and (max-device-width : 1024px) {
      align-items: center;
      background-image: url(${CLOUDINARY_URL}/wall-small);
    }
  `}
`