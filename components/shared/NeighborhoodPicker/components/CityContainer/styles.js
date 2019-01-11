import styled from 'styled-components'
import { themeGet } from 'styled-system'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Icon from '@emcasa/ui-dom/components/Icon'
import {
  SEARCH_CONTAINER_WIDTH
} from '../../styles'

const CitiesWrapper = styled(Row)`
  position: absolute;
  flex-direction: column;
  width: ${SEARCH_CONTAINER_WIDTH}px;
  top: calc(${theme.buttonHeight[0]}px + 6px);
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.lightGrey};
  border-radius: 0 0 4px 4px;
  box-sizing: border-box;
`

export {
  CitiesWrapper
}
