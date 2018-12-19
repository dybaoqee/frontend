import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import { MAX_HEADER_HEIGHT } from 'components/shared/Shell/NewHeader/styles'

const OVER_HEADER = 6
const BELOW_HEADER = 1

const Container = styled(Row)`
  position: sticky;
  top: ${MAX_HEADER_HEIGHT}px;
  padding: ${theme.space[4]}px;
  z-index: ${({isFilterOpen}) => isFilterOpen ? OVER_HEADER : BELOW_HEADER};
  background-color: ${theme.colors.white};
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
  Overlay
}
