import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import {desktopHeaderAndFilterHeight} from 'constants/dimensions'
import theme from '@emcasa/ui'

export default styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: calc(100vh - ${desktopHeaderAndFilterHeight + 40}px);
  margin-top: 20px;
  justify-content: space-around;
  width: 100%;
  &:hover {
    background: ${colors.offWhite};
  }
  div {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  p {
    font-family: FaktSoftPro-Normal;
    color: ${theme.colors.pink};
    font-weight: 600;
    margin: 0 0 10px;
    max-width: calc(100% - 40px);
    text-align: center;
  }

  @media ${mobileMedia} {
    .container {
      margin-left: 20px;
      width: calc(100% - 40px);
    }
  }
`
