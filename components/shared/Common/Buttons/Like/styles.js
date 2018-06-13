import styled from 'styled-components'
import * as colors from 'constants/colors'

export default styled.div`
  background: none;
  border: none;
  box-shadow: none;
  box-sizing: border-box;
  pointer-events: all;

  ${({buttonStyle}) =>
    buttonStyle &&
    `
      font-size: 14px;
      font-weight: 600;
      border: 1px solid ${colors.mediumDarkGray};
      width: 90px;
      height: 37px;
      border-radius: 4px;
      background: white;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding: 7px 12px 9px;

      svg {
        margin-right: 5px;
      }


  `};
  svg {
    width: 15px;
    text-shadow: 2px 2px 3px #f00;
    text-shadow: 2px 2px 3px #f00;

    path {
      text-shadow: 2px 2px 3px #f00;
      fill: ${({favorite}) => (favorite ? colors.red.medium : 'white')};
      fill-opacity: ${({favorite}) => (favorite ? 1 : 0)};
      stroke: ${({secondary, favorite}) =>
        secondary ? (favorite ? colors.red.medium : 'black') : 'white'};
      stroke-width: 30;
    }
  }

  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`
