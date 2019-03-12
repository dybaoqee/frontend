import styled from 'styled-components'
import theme from '@emcasa/ui'
import { breakpoint } from '@emcasa/ui/lib/styles'
import View from '@emcasa/ui-dom/components/View'

const CLOUDINARY_URL = 'https://res.cloudinary.com/emcasa/image/upload/fl_any_format/v1542831121/background'

export const SofaContainer = styled(View)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: stretch;

  background-image: url(${CLOUDINARY_URL}/wall-large);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;

  @media ${breakpoint.only('phone')} {
    background-image: url(${CLOUDINARY_URL}/wall-small);
  }

  ${({showBackground}) => !showBackground && `background-image: none;`}
`