import styled from 'styled-components'

import * as colors from 'constants/colors'

export default styled.div`
  background: ${colors.blue.medium};
  border-radius: 4px;
  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 12px;
  font-weight: 400;
  margin-top: -6px;
  padding: 3px 6px 4px;
  position: absolute;
  transform: translate(-50%, -100%);
  &:hover {
    background: ${colors.blue.dark};
    &:after {
      border-top: 8px solid ${colors.blue.dark};
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
    border-top: 8px solid ${colors.blue.medium};
  }
`
