import styled from 'styled-components'

import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.header`
  box-sizing: border-box;
  align-items: center;
  background: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 11px 10px;
  position: fixed;
  top: 0;
  width: 100%;
  min-height: 76px;
  z-index: 5;
  box-shadow: inset 0 -1px 0 0 ${colors.lightGray};
  img {
    width: 110px;
    vertical-align: middle;
  }

  @media ${mobileMedia} {
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
  @media ${mobileMedia} {
    display: block;
  }
`

export const Nav = styled.nav`
  float: right;
  margin-right: 10px;
  margin-top: 2px;
  display: flex;
  align-items: baseline;
  a {
    box-sizing: border-box;
    color: ${colors.blue.medium};
    margin-left: 20px;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  a:visited {
    color: ${colors.blue.medium};
  }
  @media ${mobileMedia} {
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    flex: 0 0 calc(100% + 20px);
    flex-direction: column;
    margin-left: -10px;
    a:first-of-type {
      border-top: 1px solid ${colors.offWhite};
      margin-top: 5px;
    }
    a {
      border-bottom: 1px solid ${colors.offWhite};
      margin: 0;
      padding: 10px;
      min-width: 100%;
    }
  }
`

export const UserHeader = styled.div`
  margin-left: ${({authenticated}) => (authenticated ? 0 : 10)}px;
  @media ${mobileMedia} {
    min-width: 100%;
    margin-left: 0px;
    margin-top: 10px;
  }
`

export const Error = styled(({children, ...props}) => (
  <div {...props}>
    <span>{children}</span>
  </div>
))
