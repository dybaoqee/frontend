import styled from 'styled-components'
import {themeGet} from 'styled-system'
import * as colors from 'constants/colors'
import Row from '@emcasa/ui-dom/components/Row'

export const Wrapper = styled(Row)`
  justify-content: center;
  padding: 0 ${themeGet('space.4')}px;
  margin: ${themeGet('space.5')}px 0;
`

export const Container = styled('ul')`
  box-sizing: border-box;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
  padding: 0;

  a,
  :visited {
    text-decoration: none;
    color: ${colors.blue.medium};
    font-weight: 700;
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
  :not(:first-of-type) {
    :before {
      content: '>';
      font-size: 14px;
      margin: 0 5px;
      position: relative;
      color: ${themeGet('colors.grey')};
    }
  }

  a {
    cursor: pointer;
    text-decoration: none;
    color: ${themeGet('colors.grey')};

    &:hover {
      color: ${themeGet('colors.pink')};
    }
  }
`
