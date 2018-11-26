import styled, { css } from 'styled-components'
import { themeGet } from 'styled-system'

import {headerMobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.header`
  box-sizing: border-box;
  align-items: center;
  background: ${props => props.transparent ? 'transparent' : 'white'};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0px 24px;
  width: 100%;
  max-height: 76px;
  height: 76px;
  ${props => !props.hideSeparator && css`border-bottom: 1px solid ${colors.lightGray}`};
  img {
    width: 110px;
    vertical-align: middle;
  }

  @media ${headerMobileMedia} {
    padding: 17px 20px 12px;
  }
`

export const Button = styled.button`
  display: none;
  background: transparent;
  border: none;
  box-shadow: none;
  color: gray;
  font-size: 17px;
  margin-top: -3px;
  margin-right: 9px;
  transform: scale(1.5, 1);
  padding-left: 5px;
  padding-right: 5px;
  &:hover {
    background: ${colors.offWhite};
    color: gray;
  }
  @media ${headerMobileMedia} {
    display: block;
  }
`

export const Nav = styled.nav`
  flex: 1;
  min-height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  a {
    box-sizing: border-box;
    text-decoration: none;
    color: ${colors.blue.medium};
  }
  a:visited {
    color: ${colors.blue.medium};
  }

  > :nth-child(n + 2) {
    margin-left: 20px;
  }

  > * {
    position: relative;
    width: auto;
    :hover {
      :after {
        content: '';
        width: 100%;
        height: 1px;
        background: ${colors.blue.dark};
        position: absolute;
        top: calc(100% - 3px);
      }
    }
  }

  @media ${headerMobileMedia} {
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    flex-direction: column;
    background: white;
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 100%;
    border-bottom: 1px solid ${colors.lightGray};

    button {
      margin: 0 10px 0 0;
    }

    > * {
      box-sizing: border-box;
      border-bottom: 1px solid ${colors.offWhite};
      padding: 10px;
      margin: 0 10px !important;

      :hover {
        :after {
          display: none;
        }
      }
    }
  }
`

export const UserHeader = styled.div`
  display: flex;
  align-items: center;

  @media ${headerMobileMedia} {
    margin: 0;
  }
`

export const Error = styled(({children, ...props}) => (
  <div {...props}>
    <span>{children}</span>
  </div>
))

export const Wrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 5;
  width: 100vw;
`

export const MenuItem = styled.div`
  box-sizing: border-box;
  width: ${({isIcon}) => isIcon ? 'auto' : '120px'};
  color: ${({active}) => (active ? colors.gray4a : colors.blue.medium)};
  :after {
    content: '';
    display: ${({active}) => (active ? 'block' : 'none')};
    width: 100%;
    height: 3px;
    background: ${colors.blue.dark};
    position: absolute;
    top: calc(100% - 3px);
  }

  line-height: 22px;
  display: flex;
  justify-content: center;

  min-height: 100%;
  align-items: center;

  svg {
    font-weight: 300;
    width: 18px !important;
    height: 18px;
    margin-right: 5px;
  }

  @media ${headerMobileMedia} {
    :after {
      width: ${({active}) => (active ? '96%' : 0)};
    }
  }
`

export const Logo = styled.img`
  content: url(/static/emcasa-imobiliaria-rio-de-janeiro.png);
  max-width: 118px;
`
