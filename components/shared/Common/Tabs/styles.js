import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.div`
  margin: 50px auto 30px;
  padding: 10px;
  width: ${({full}) => (full ? '100%' : '400px')};

  @media ${mobileMedia} {
    width: calc(100vw - 40px);
  }
`

export const TabTitles = styled.div`
  display: flex;
  margin-bottom: 36px;
`
export const TabTitle = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  height: 30px;
  width: 64px;
  font-size: 16px;
  letter-spacing: -0.1px;
  line-height: 22px;
  text-align: center;
  padding-bottom: 5px;
  color: ${({active}) => (active ? colors.textColor : colors.mediumGray)};
  transition: all 0.3s;

  ${({active}) =>
    active
      ? `border-bottom: 3px solid ${colors.blue.medium};`
      : `border-bottom: 1px solid ${colors.mediumGray};`};
`
