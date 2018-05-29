import styled from 'styled-components'
import {headerMobileMedia} from 'constants/media'
import * as constants from 'constants/dimensions'

export default styled.div`
  box-sizing: border-box;
  display: flex;
  margin: 0 auto;
  max-width: 1100px;
  padding: 60px 20px;
  max-height: calc(100vh - ${constants.desktopHeaderHeight}px);

  @media ${headerMobileMedia} {
    display: flex;
    padding: 10px;
    min-width: 100%;
    flex-direction: column;
  }
`
