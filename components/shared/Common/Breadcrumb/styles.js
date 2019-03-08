import styled from 'styled-components'
import theme from 'config/theme'
import * as colors from 'constants/colors'
import {headerMobileMedia, mobileMedia} from 'constants/media'
import Text from '@emcasa/ui-dom/components/Text'

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
  margin: 35px auto 0;
  padding: 0;

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
  height: 100%;
  margin-bottom: 10px;
  :hover: {
    cursor: pointer;
  }

  :not(:first-of-type) {
    :before {
      content: '>';
      font-size: 14px;
      margin: 0 5px;
      position: relative;
      color: ${theme.colors.grey};
    }
  }
`

export const BreadcrumbText = styled(Text)`
  ${({link}) => link && `
    cursor: pointer;

    :hover {
      color: ${theme.colors.pink};
    }
  `}
`
