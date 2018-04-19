import styled from 'styled-components'

import * as colors from 'constants/colors'

export default styled.div`
  background: ${({highlight}) => (highlight ? 'white' : colors.blue.medium)};
  border-radius: 4px;
  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.3);
  color: ${({highlight}) => (highlight ? colors.blue.medium : 'white')};
  font-size: 12px;
  font-weight: 400;
  margin-top: -6px;
  padding: 3px 6px 4px;
  position: absolute;
  transform: translate(-50%, -100%);
  transform: scale(${({highlight}) => (highlight ? 1.3 : 1)});
  transition: transform 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: ${({highlight}) => (highlight ? 1 : 0)};

  &:hover {
    background: white;
    transform: scale(1);
    z-index: 1;
    cursor: pointer;
    color: ${colors.blue.medium};
    &:after {
      border-top: 8px solid white;
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
    border-top: 8px solid
      ${({highlight}) => (highlight ? 'white' : colors.blue.medium)};
  }
`
