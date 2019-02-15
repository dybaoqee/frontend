import theme from 'config/theme'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import styled from 'styled-components'

export default styled.div`
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  float: left;
  font-size: 20px;
  height: 300px;
  width: 100%;
  background: white;
  position: relative;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }

  > p {
    clear: both;
    float: left;
    margin: 0 ${theme.space[4]}px;
    &.price {
      font-size: 24px;
      font-weight: 300;
      margin-top: ${theme.space[3]}px;
    }
    &.street {
      color: ${theme.colors.mediumDarkGray};
      font-size: 14px;
      margin-bottom: ${theme.space[1]}px;
      margin-top: ${theme.space[1]/2}px;
    }
    &.neighborhood {
      color: ${theme.colors.mediumDarkGray};
      font-size: 14px;
      text-transform: uppercase;
    }
  }
  > .image-container {
    object-fit: cover;
    border-radius: 4px 4px 0 0;
    background-position: center;
    height: 180px;
    width: 100%;
  }

  @media ${mobileMedia} {
    margin-bottom: ${theme.space[5]}px;
    width: 100%;
  }
`
