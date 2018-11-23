import styled from 'styled-components'
import { themeGet } from 'styled-system'

import Row from '@emcasa/ui-dom/components/Row'
import View from '@emcasa/ui-dom/components/View'

const CardContainer = styled(Row)`
  max-width: 300px;
`

const Separator = styled(View)`
  height: 1px;
  width: 100%;
  background-color: ${themeGet('colors.lightGrey')};
`

export {
  CardContainer,
  Separator
}
