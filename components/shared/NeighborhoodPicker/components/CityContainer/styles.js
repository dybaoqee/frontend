import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'
import {
  SEARCH_CONTAINER_MAX_WIDTH
} from '../../styles'

const MARGINS = theme.space[4] * 2
const TOP = 19

const CitiesWrapper = styled(Row)`
  position: absolute;
  flex-direction: column;
  width: calc(35% - 14px);
  max-width: ${SEARCH_CONTAINER_MAX_WIDTH}px;
  top: calc(${theme.buttonHeight[0]}px + 9px);
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.lightGrey};
  border-radius: 0 0 4px 4px;
  box-sizing: border-box;
  z-index: 1;

  @media (max-width: ${theme.breakpoints[0]}) {
    width: calc(100% - ${MARGINS}px);
    top: calc(${theme.buttonHeight[0]}px + ${TOP}px);
    max-width: none;
    margin-bottom: ${theme.space[4]}px;
  }
`

const NeighborhoodButton = styled(Button)`
  :hover {
    border: 1px solid ${theme.colors.pink};

  }
`

const Separator = styled.hr`
  border: 0.5px solid ${theme.colors.lightGrey};
`

export {
  CitiesWrapper,
  NeighborhoodButton,
  Separator
}
