import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.div`
  box-sizing: border-box;
`

export const Thumb = styled.div`
  box-sizing: border-box;
  position: absolute;
  cursor: pointer;
  outline: none;
  border-radius: 100%;
  padding: 0;
  margin: 0;
  top: -14px;
  height: 28px;
  width: 28px;
  background-color: ${colors.blue.medium};

  box-shadow: inset 0 0 0 1px ${colors.blue.darker};

  img[role='slider'].focus,
  :hover {
    box-shadow: inset 0 0 0 1px #094156, 0 4px 2px 0 rgba(0, 0, 0, 0.2),
      0 0 0 12px rgba(34, 126, 162, 0.15);
  }
`

export const Rail = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 4px;
  border-radius: 6px;
  background-color: ${colors.lightestGray};
  box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.2);
`
