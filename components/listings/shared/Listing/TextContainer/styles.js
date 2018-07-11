import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia, headerMobileMedia} from 'constants/media'

export default styled.div`
  padding: 0 20px;
  box-sizing: border-box;
  pointer-events: none;

  div.header {
    display: flex;
    justify-content: space-between;
  }

  div.description {
    font-size: 14px;
    margin: 14px 0 0;
    span {
      color: ${colors.blue.medium};
      text-decoration: none;
      pointer-events: all;
      font-weight: 700;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  div.address {
    font-size: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    p {
      margin: 0 8px 0 0;
    }
    span {
      text-transform: uppercase;
      color: ${colors.mediumDarkGray};
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.4px;
      line-height: 15px;
    }
  }

  @media ${headerMobileMedia} {
    padding: 0 10px 0;
  }

  @media ${mobileMedia} {
    padding: 0;
    width: 100%;
    margin: 10px 0;

    ${({resumedInfo}) => resumedInfo && 'display: none;'};
  }
`
