import styled, { css } from 'styled-components'
import * as constants from 'constants/dimensions'

export default styled.div`
  margin-top: ${(props) => props.transparentHeader ? 0 : constants.desktopHeaderHeight}px;
  display: flex;
  box-sizing: border-box;
  min-height: calc(100vh - ${constants.desktopHeaderHeight}px);
  flex-direction: column;
`

export const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  box-sizing: border-box;
`
