import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { HEADER_HEIGHT } from 'components/shared/Shell/NewHeader/styles'
import Row from '@emcasa/ui-dom/components/Row'

const MIN_WIDTH_FOR_MAP_RENDER = 1279
const MAP_WIDTH_PERCENT = 30

const Title = styled(Row)`
  margin-left: 30px;
  margin-right: 30px;
`

const Container = styled(Row)`
  justify-content: flex-start;
  margin: auto;
`

const MapContainer = styled.div`
  position: sticky;
  top: ${HEADER_HEIGHT}px;
  right: ${themeGet('space.4')}px;
  overflow: hidden;
  box-sizing: border-box;
  background: white;
  border-radius: 4px;
  min-width: ${MAP_WIDTH_PERCENT}%;
  height: calc(100vh - ${HEADER_HEIGHT}px);
`

const Loading = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export {
  MIN_WIDTH_FOR_MAP_RENDER,
  MAP_WIDTH_PERCENT,
  Container,
  MapContainer,
  Loading,
  Title
}
