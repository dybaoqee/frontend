import styled from 'styled-components'
import { HEADER_HEIGHT } from 'components/shared/Shell/NewHeader/styles'

export const MapContainer = styled.div`
  position: sticky;
  right: 0;
  top: ${HEADER_HEIGHT}px;
  overflow: hidden;
  box-sizing: border-box;
  background: white;
  border-radius: 4px;
  width: 420px;
  min-width: 420px;
  height: calc(100vh - ${HEADER_HEIGHT}px);
`

export const Loading = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
