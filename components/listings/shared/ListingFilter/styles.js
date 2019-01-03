import styled, { css } from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import { MAX_HEADER_HEIGHT } from 'components/shared/Shell/NewHeader/styles'
import {
  EXPAND_BUTTON_WIDTH
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
  flex-wrap: nowrap;
  overflow: scroll hidden;
  height: 40px;
  margin-right: calc(${EXPAND_BUTTON_WIDTH}px + ${theme.space[4]}px);
`

const ButtonsWrapper = styled(Row)`
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;

  ${({expanded}) => expanded ? null : expandedWrapper}
`

const Overlay = styled.div`
  position: absolute;
  top: ${-MAX_HEADER_HEIGHT}px;
  left: 0;
  width: 100%;
  height: 200%;
`

export {
  Container,
  Overlay,
  ButtonsWrapper
}
