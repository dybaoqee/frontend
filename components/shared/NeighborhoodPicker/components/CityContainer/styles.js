import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'
import {
  SEARCH_CONTAINER_WIDTH
} from '../../styles'

const CitiesWrapper = styled(Row)`
  position: absolute;
  flex-direction: column;
  width: ${SEARCH_CONTAINER_WIDTH}px;
  top: calc(${theme.buttonHeight[0]}px + 9px);
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.lightGrey};
  border-radius: 0 0 4px 4px;
  box-sizing: border-box;
`

const NeighborhoodButton = styled(Button)`
  :hover {
    border: 1px solid ${theme.colors.pink};

  }
`

export {
  CitiesWrapper,
  NeighborhoodButton
}
