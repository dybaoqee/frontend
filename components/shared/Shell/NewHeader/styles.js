import styled from 'styled-components'
import theme from '@emcasa/ui'

export default styled.header`
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
  @media (max-width: ${theme.breakpoints[0]}) {
    content: url(https://s3.amazonaws.com/emcasa-ui/logo/symbol.svg);
    max-width: 32px;
  }
  content: url(https://s3.amazonaws.com/emcasa-ui/logo/logo.svg);
  max-width: 118px;
`
