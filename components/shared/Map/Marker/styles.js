import styled from 'styled-components'

import * as colors from 'constants/colors'

export default styled.div`
  background: ${colors.blue};
  border-radius: 4px;
  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 16px;
  font-weight: 700;
  margin-top: -6px;
  padding: 4px 10px 6px;
  position: absolute;
  transform: translate(-50%, -100%);
  &:hover {
    background: ${colors.darkenedBlue};
    &:after {
      border-top: 8px solid ${colors.darkenedBlue};
    }
  }
  &:after {
    bottom: -6px;
    content: '';
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 8px solid ${colors.blue};
  }
`
