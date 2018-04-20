import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

export default styled.ul`
  width: calc(100% - 720px);
  list-style: none;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin: 20px auto 0;

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
