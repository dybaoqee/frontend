import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { HEADER_HEIGHT } from 'components/shared/Shell/NewHeader/styles'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'

const MIN_WIDTH_FOR_MAP_RENDER = 1279
const MAP_WIDTH_PERCENT = 30

const shouldShowMap = () => {
  if (process.browser && window) {
    return window.innerWidth >= MIN_WIDTH_FOR_MAP_RENDER
  }
  return false
}

const H2Title = Text.withComponent('h2')

const Title = styled(H2Title)`
  margin: 0 ${themeGet('space.4')}px ${themeGet('space.3')}px;
`

const Container = styled(Row)`
  justify-content: space-between;
  margin: 0, auto, 0, auto;
`

const MapContainer = styled.div`
  position: sticky;
  top: ${HEADER_HEIGHT}px;
  margin-right: ${themeGet('space.4')}px;
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
  shouldShowMap,
  Container,
  MapContainer,
  Loading,
  Title
}
