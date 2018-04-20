import styled from 'styled-components'
import * as colors from 'constants/colors'
import {headerMobileMedia, mobileMedia} from 'constants/media'

export default styled.ul`
  box-sizing: border-box;
  width: 960px;
  list-style: none;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 500;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 20px auto 0;
  padding-left: 20px;
  padding-right: 20px;

  @media ${headerMobileMedia} {
    width: 100%;
  }

  @media ${mobileMedia} {
    display: none;
  }

  a,
  :visited {
    text-decoration: none;
    color: ${colors.blue.medium};
    font-weight: bold;
  }

  svg {
    width: 20px !important;
    height: 20px;
    :hover {
      cursor: pointer;
    }
    path {
      fill: ${colors.red.logo};
    }
  }
`

export const Path = styled.li`
  height: 100%;
  margin-bottom: 10px;
  :hover: {
    cursor: pointer;
  }

  :not(:first-of-type) {
    :before {
      content: '>';
      margin: 0 3px;
    }
  }
`
