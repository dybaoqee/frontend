import styled, { css } from 'styled-components'
import posed from 'react-pose'
import theme from 'config/theme'
import Row from '@emcasa/ui-dom/components/Row'
import { MAX_HEADER_HEIGHT } from 'components/shared/Shell/Header/styles'
import {
  EXPAND_BUTTON_SIZE
} from './components/ExpandButton/styles'

const OVER_HEADER = 6
const BELOW_HEADER = 1
const CLOSED_BUTTONS_HEIGHT = 34
const DURATION = 300

const Container = styled(Row)`
  position: sticky;
  top: ${MAX_HEADER_HEIGHT}px;
  padding: ${theme.space[4]}px;
  z-index: ${({isFilterOpen}) => isFilterOpen ? OVER_HEADER : BELOW_HEADER};
  background-color: ${theme.colors.white};
`

const expandedWrapper = css`
  height: ${CLOSED_BUTTONS_HEIGHT}px;

  @media screen and (max-width: ${theme.breakpoints[0]}) {
    overflow: hidden;
  }
`

const ButtonsWrapperBase = styled(Row)`
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: calc(${EXPAND_BUTTON_SIZE}px + ${theme.space[4]}px);

  ${({expanded}) => expanded ? `height: auto;` : expandedWrapper}
`

const ButtonsWrapper = posed(ButtonsWrapperBase)({
  open: {
    height: 'auto',
    transition: { duration: DURATION }
  },
  closed: {
    height: CLOSED_BUTTONS_HEIGHT,
    transition: { duration: DURATION }
  },
})

export {
  Container,
  ButtonsWrapper,
  ButtonsWrapperBase
}
