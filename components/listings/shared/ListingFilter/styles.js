import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import { HEADER_HEIGHT } from 'components/shared/Shell/NewHeader/styles'

const Container = styled(Row)`
  position: sticky;
  top: ${HEADER_HEIGHT}px;
  padding: ${theme.space[4]}px;
  z-index: 1;
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
