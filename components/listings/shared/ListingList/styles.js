import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { HEADER_HEIGHT } from 'components/shared/Shell/NewHeader/styles'
import Row from '@emcasa/ui-dom/components/Row'

const Title = styled(Row)`
  margin-left: 30px;
  margin-right: 30px;
`

const MapContainer = styled.div`
  position: sticky;
  top: ${HEADER_HEIGHT}px;
  right: ${themeGet('space.4')}px;
  overflow: hidden;
  box-sizing: border-box;
  background: white;
  border-radius: 4px;
  min-width: 30%;
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
  MapContainer,
  Loading,
  Title
}
