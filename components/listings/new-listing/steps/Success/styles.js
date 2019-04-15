import styled from 'styled-components'
import {themeGet} from 'styled-system'
import Row from '@emcasa/ui-dom/components/Row'

export const Box = styled(Row)`
  border: 1px solid ${themeGet('colors.lightGrey')};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
`
