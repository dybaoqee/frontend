import styled from 'styled-components'

import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.header`
  align-items: center;
  background: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  position: fixed;
  top: 0;
  width: calc(100% - 40px);
  z-index: 5;
  img {
    width: 110px;
  }
  button {
    display: none;
  }
  > div {
    float: right;
    margin-right: 10px;
    margin-top: 2px;
  }
  div a {
    color: ${colors.blue};
    margin-left: 20px;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  a:visited {
    color: ${colors.blue};
  }
  @media ${mobileMedia} {
    > div {
      display: none;
      flex: 0 0 calc(100% + 20px);
      flex-direction: column;
      margin-left: -10px;
    }
    > div.visible {
      display: flex;
    }
    > div > a:first-of-type {
      border-top: 1px solid ${colors.offWhite};
      margin-top: 5px;
    }
    > div > a {
      border-bottom: 1px solid ${colors.offWhite};
      margin: 0;
      padding: 10px;
    }
    button {
      background: transparent;
      border: none;
      box-shadow: none;
      color: gray;
      display: block;
      font-size: 17px;
      margin-top: -3px;
      margin-right: 9px;
      transform: scale(1.5, 1);
      padding-left: 5px;
      padding-right: 5px;
    }
    button:hover {
      background: ${colors.offWhite};
      color: gray;
    }
  }
`
