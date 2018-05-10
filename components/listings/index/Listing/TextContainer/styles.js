import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia, headerMobileMedia} from 'constants/media'

export default styled.div`
  padding: 0 20px;
  box-sizing: border-box;

  div.header {
    display: flex;
    justify-content: space-between;
  }

  div.description {
    font-size: 14px;
    margin: 14px 0 0;
    a {
      color: ${colors.blue.medium};
      display: inline-block;
      text-decoration: none;
      font-weight: bold;
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
      color: ${colors.mediumGray};
      font-size: 11px;
      font-weight: bold;
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

    ${({mapOpenedOnMobile}) => mapOpenedOnMobile && 'display: none;'};
  }
`
