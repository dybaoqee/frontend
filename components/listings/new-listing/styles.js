import styled from 'styled-components'
import View from '@emcasa/ui-dom/components/View'

const CLOUDINARY_URL = 'https://res.cloudinary.com/emcasa/image/upload/fl_any_format/v1542831121/background'

export const BUTTON_WIDTH = 130
export const LARGE_BUTTON_WIDTH = 260

export const SofaContainer = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;

  background-image: url(${CLOUDINARY_URL}/wall-small);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;

  ${({showBackground}) => !showBackground && `background-image: none;`}
`
