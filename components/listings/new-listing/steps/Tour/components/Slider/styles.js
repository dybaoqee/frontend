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
  ${({noBorder, selected}) => {
    if (noBorder) {
      return 'border: none;'
    }
    if (selected) {
      return `border: 1px solid ${themeGet('colors.pink')}`
    }
    return `border: 1px solid ${themeGet('colors.grey')}`
  }}
  ${({height}) => height === 'extraTall' && 'width: 75px; height: 84px;'}
`

export {
  PageButton,
  SliderButton
}
