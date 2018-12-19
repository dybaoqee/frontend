import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import { MAX_HEADER_HEIGHT } from 'components/shared/Shell/NewHeader/styles'

const Container = styled(Row)`
  position: sticky;
  top: ${MAX_HEADER_HEIGHT}px;
  padding: ${theme.space[4]}px;
  z-index: 6;
  background-color: ${theme.colors.white};
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export {
  Container,
  Overlay
}
