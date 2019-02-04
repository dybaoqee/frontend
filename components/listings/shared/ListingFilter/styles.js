import styled, { css } from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import { MAX_HEADER_HEIGHT } from 'components/shared/Shell/NewHeader/styles'
import {
  EXPAND_BUTTON_SIZE
} from './components/ExpandButton/styles'

const OVER_HEADER = 6
const BELOW_HEADER = 1

const Container = styled(Row)`
  position: sticky;
  top: ${MAX_HEADER_HEIGHT}px;
  padding: ${theme.space[4]}px;
  z-index: ${({isFilterOpen}) => isFilterOpen ? OVER_HEADER : BELOW_HEADER};
  background-color: ${theme.colors.white};
`

const expandedWrapper = css`
  height: 34px;

  @media screen and (max-width: ${theme.breakpoints[0]}) {
    overflow: hidden;
  }
`

const ButtonsWrapper = styled(Row)`
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: calc(${EXPAND_BUTTON_SIZE}px + ${theme.space[4]}px);

  ${({expanded}) => expanded ? null : expandedWrapper}
`

export {
  Container,
  ButtonsWrapper
}
