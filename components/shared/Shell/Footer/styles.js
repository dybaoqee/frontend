import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import styled from 'styled-components'

export default styled.footer`
  align-items: center;
  background: ${colors.offWhite};
  border-top: 1px solid ${colors.lightGray};
  display: flex;
  justify-content: space-between;
  padding: 20px;

  a {
    color: ${colors.mediumDarkGray};
    text-decoration: none;
  }

  img {
    width: 110px;
  }

  > div {
    align-items: center;
  }

  div {
    display: flex;
    a {
      position: relative;
      margin-left: 30px;
      &.icon {
        color: ${colors.blue};
        font-size: 20px;
        top: 0;
      }
    }
  }

  @media ${mobileMedia} {
    align-items: center;
    padding: 10px 15px;

  img {
    width: 100px;
  }

  > div {
    a {
      margin-left: 0;
      margin-right: 16px;
    }

    > div {
      align-items: flex-end;
      display: flex;
      flex-direction: column;

      a {
        order: 2;
      }

      > a {
        font-size: 12px;
        margin-right: 0;
        margin-top: 5px;
      }

      div:first-of-type {
        order: 1;
        a:last-of-type {
          margin-right: 0;
        }
      }
    }
`
