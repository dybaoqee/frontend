import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {mobileMedia} from 'constants/media'

export default styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: ${({full}) => (full ? null : '700px')};
  margin: ${({full, theme}) =>
    full ? '0 auto 20px' : `50px auto ${theme.space[5]}px`};
  padding: ${({full, theme}) => (full ? '40px' : `${theme.space[2]}px`)};

  @media ${mobileMedia} {
    padding: 10px;
    width: calc(100vw - 40px);
  }
`

export const TabTitles = styled.div`
  display: flex;
  margin-bottom: ${themeGet('space.5')}px;
`

export const TabTitle = styled.div`
  flex: 1 1 100%;
  box-sizing: border-box;
  cursor: pointer;
  height: 30px;
  width: auto;
  font-size: ${themeGet('fontSizes.1')}px;
  letter-spacing: -0.1px;
  line-height: 22px;
  text-align: center;
  padding: 0px ${themeGet('space.1')}px;
  color: ${themeGet('colors.dark')};
  transition: color 0.3s;
  border-bottom: ${({active, theme}) =>
    active ? `1px solid ${theme.colors.pink}` : null};
`
