import styled from 'styled-components'
import * as colors from 'constants/colors'
import {desktopHeaderHeight} from 'constants/dimensions'
import {headerMobileMedia} from 'constants/media'

export default styled.div`
  box-sizing: border-box;
  padding: 30px 40px;
  width: 380px;
  height: calc(100vh - ${desktopHeaderHeight}px);
  background: ${colors.offWhite};
  span {
    margin-left: 10px;
    color: ${colors.gray4a};
    font-size: 14px;
    font-weight: 500;
  }
  svg {
    width: 15px !important;
    height: 15px;
    path {
      fill: ${colors.green.medium};
    }
  }

  a {
    text-decoration: none;
    color: ${colors.text};
    font-weight: 600;
  }

  @media ${headerMobileMedia} {
    width: 100%;
    height: auto;
    margin-top: 20px;
  }
`
