import styled, {keyframes} from 'styled-components'
import theme from 'config/theme'
import Col from '@emcasa/ui-dom/components/Col'
import {breakpoint} from '@emcasa/ui/lib/styles'
import {zIndexHeader} from 'constants/zIndex'
import {desktopHeaderHeight} from 'constants/dimensions'

export const MAX_HEADER_HEIGHT = 76
export const NAV_ZINDEX = 2

export default styled.header`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: ${props => props.search ? MAX_HEADER_HEIGHT : desktopHeaderHeight}px;
  padding: ${theme.space[2]}px ${theme.space[4]}px 0 ${theme.space[4]}px;
  z-index: 1;
  transition: background 0.3s ease-out;
  transition: height 0.3s ease-out;
  background: ${(props) => (props.transparent ? 'transparent' : 'white')};

  &.sticky {
    background: white;
  }

  .search {
    ${({search}) => (!search ? {height: theme.buttonHeight[1]} : null)};
  }
`

export const Wrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: ${zIndexHeader};
  width: 100vw;
`

const slideFromRight = keyframes`
  from { right: -${desktopHeaderHeight}vw; }
  to   { right: 0; }
`

export const Nav = styled.nav`
  min-height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1;

  > :nth-child(n + 2) {
    margin-left: 20px;
  }

  > a {
    color: inherit;
    text-decoration: none;
  }

  @media ${breakpoint.down('tablet')} {
    z-index: ${NAV_ZINDEX};
    position: absolute;
    top: 0;
    right: -${desktopHeaderHeight}vw;
    animation: ${slideFromRight} 0.3s 0s both;

    display: ${(props) => (props.visible ? 'flex' : 'none')};
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: ${desktopHeaderHeight}vw;
    height: 100vh;

    > :nth-child(n + 2) {
      margin-left: 0;
    }
  }
`

export const NavButton = styled.button`
  display: none;
  cursor: pointer;
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
    color: gray;
  }

  @media ${breakpoint.down('tablet')} {
    display: ${(props) => (props.visible ? 'block' : 'none')};
  }
`

export const CloseNavButton = styled.div`
  display: none;
  cursor: pointer;
  background: transparent;
  border: none;
  box-shadow: none;
  color: ${theme.colors.dark};
  margin: 30px;
  align-self: flex-end;

  content: url(/static/assets/close.svg);

  @media ${breakpoint.down('tablet')} {
    display: ${(props) => (props.visible ? 'block' : 'none')};
  }
`

export const MenuItem = styled.div`
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  min-height: 100%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    display: none;
  }

  p {
    font-size: 16px;
    color: ${theme.colors.dark};
    line-height: 24px;
    text-align: center;
  }

  &:hover,
  &.active {
    border-bottom: 1px solid ${theme.colors.pink};
  }

  @media ${breakpoint.down('tablet')} {
    min-height: auto;
    height: ${desktopHeaderHeight}px;
    width: auto;

    align-items: center;
    justify-content: flex-start;

    p {
      text-align: left;
      font-weight: 500;
      color: ${theme.colors.dark};
    }

    .icon {
      display: block;
      margin-right: 40px;
    }

    border-left: 7px solid transparent;
    padding-left: 20px;

    &:hover,
    &.active {
      border-left: 7px solid ${theme.colors.pink};
      border-bottom: none;
    }
  }
`

export const Logo = styled.div`
  cursor: pointer;
  transform: translateZ(0);
  content: url(https://s3.amazonaws.com/emcasa-ui/logo/logo.svg);
  max-width: 118px;
`

export const ShortLogo = styled.div`
  cursor: pointer;
  transform: translateZ(0);
  content: url(https://s3.amazonaws.com/emcasa-ui/logo/symbol.svg);
  max-width: 32px;
`

export const LabelLogo = styled.span`
  position: absolute;
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  padding: 0;
  border: 0;
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 0.5; }
`

export const Overlay = styled.div`
  @media ${breakpoint.up('desktop')} {
    display: none;
  }
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0;
  animation: ${fadeIn} 0.3s 0s both;
  z-index: ${NAV_ZINDEX - 1};
`

export const Search = styled.div`
  margin-left: 20px;
  width: 100%;

  @media ${breakpoint.down('tablet')} {
    width: 80%;
  }
`

export const SearchWrapper = styled(Col)`
  width: 100%;
  margin-left: ${theme.space[4]}px;
  max-width: 560px;

  @media screen and ${breakpoint.down('tablet')} {
    max-width: calc(100% - 51px);
  }
`
