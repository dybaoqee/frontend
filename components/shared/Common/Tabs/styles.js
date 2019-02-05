import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import theme from '@emcasa/ui'

export default styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: ${({full}) => (full ? null : '700px')};
  margin: ${({full}) => (full ? '0 auto 20px' : `50px auto ${theme.space[5]}px`)};
  padding: ${({full}) => (full ? '40px' : `${theme.space[2]}px`)};

  @media ${mobileMedia} {
    padding: 10px;
    width: calc(100vw - 40px);
  }
`

export const TabTitles = styled.div`
  display: flex;
  margin-bottom: ${theme.space[5]}px;
`

export const TabTitle = styled.div`
  flex: 1 1 100%;
  box-sizing: border-box;
  cursor: pointer;
  height: 30px;
  width: auto;
  font-size: ${theme.fontSizes[1]}px;
  letter-spacing: -0.1px;
  line-height: 22px;
  text-align: center;
  padding: 0px ${theme.space[1]}px;
  color: ${theme.colors.dark};
  transition: color 0.3s;
  border-bottom: ${({active}) => active ? `1px solid ${theme.colors.pink}` : null};
`
