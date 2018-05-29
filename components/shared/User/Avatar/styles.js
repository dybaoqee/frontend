import styled from 'styled-components'
import * as colors from 'constants/colors'
import {headerMobileMedia} from 'constants/media'

export default styled.div`
  width: 64px;
  height: 64px;
  border: 1px solid
    ${({admin}) => (admin ? colors.lightestGray : colors.blue.light2)};
  background-color: ${({admin}) => (admin ? colors.grayf0 : colors.blue.light)};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  color: ${colors.blue.medium};
  font-weight: bold;

  img {
    width: 70%;
    height: 70%;
  }

  @media ${headerMobileMedia} {
    width: 30px;
    height: 30px;
    font-size: 11px;
  }
`
