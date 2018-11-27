import styled from 'styled-components'
import theme from '@emcasa/ui'

export default styled.header`
  transition: background 0.3s ease-out;
  transition: height 0.3s ease-out;
  max-height: 76px;
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
  
  &.sticky {
    background: white;
    height: 60px;
  }
`

export const Wrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 5;
  width: 100vw;
`

export const Nav = styled.nav`
  flex: 1;
  min-height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  > :nth-child(n + 2) {
    margin-left: 20px;
  }
  
  @media (max-width: ${theme.breakpoints[0]}) {
    display: none;
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
  
  @media (max-width: ${theme.breakpoints[0]}) {
    display: block;
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
  
  p {
    font-size: 16px;
    color: ${theme.colors.dark};
    font-weight: 'Blond';
    font-family: 'FaktSoftPro-Blond';
    line-height: 24px;
    text-align: center;
  }
 
  &:hover {
    border-bottom: 1px solid ${theme.colors.pink};
  }
`

export const Logo = styled.div`
  cursor: pointer;
  transform: translateZ(0);
  @media (max-width: ${theme.breakpoints[0]}) {
    content: url(https://s3.amazonaws.com/emcasa-ui/logo/symbol.svg);
    max-width: 32px;
  }
  content: url(https://s3.amazonaws.com/emcasa-ui/logo/logo.svg);
  max-width: 118px;
`
