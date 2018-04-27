import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import {desktopHeaderAndFilterHeight} from 'constants/dimensions'

export default styled.div`
  align-items: center;
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  height: calc(100vh - ${desktopHeaderAndFilterHeight + 40}px);
  margin-top: 20px;
  justify-content: space-around;
  width: calc(100% - 20px);
  &:hover {
    background: ${colors.offWhite};
  }
  div {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  p {
    color: ${colors.red.medium};
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
