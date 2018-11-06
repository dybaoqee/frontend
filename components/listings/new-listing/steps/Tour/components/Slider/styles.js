import styled from 'styled-components'
import { themeGet } from 'styled-system'

import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'

const PageButton = styled(Button)`
  border: none;
  padding: 0;
  margin: 0;
`

const SliderButton = styled(Button)`
  ${({noBorder}) => noBorder && 'border: none;'}
  ${({height}) => height === 'extraTall' && 'width: 75px; height: 84px;'}
`

export {
  PageButton,
  SliderButton
}
