import styled from 'styled-components'
import * as colors from 'constants/colors'
import theme from '@emcasa/ui'

export const Container = styled.div`
  position: absolute;
  cursor: pointer;
  right: 20px;
  top: ${({top}) => top ? `${top}px` : `115px`};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.lightGrey};
  box-shadow: 0 6px 16px 0 rgba(38, 38, 38, 0.15);
`

export const Button = styled.div`
  background: none;
  border: none;
  box-shadow: none;
  box-sizing: border-box;
  pointer-events: all;
  cursor: pointer;

  svg {
    width: 15px;
    text-shadow: 2px 2px 3px #f00;
    text-shadow: 2px 2px 3px #f00;

    path {
      text-shadow: 2px 2px 3px #f00;
      fill: ${({favorite}) => (favorite ? theme.colors.pink : theme.colors.white)};
      stroke: ${({favorite}) => (favorite ? theme.colors.pink : theme.colors.dark)};
      fill-opacity: ${({favorite}) => (favorite ? 1 : 0)};
      stroke-width: 60;
    }
  }

  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  ${({buttonStyle}) =>
    buttonStyle &&
    `
      font-size: 14px;
      font-weight: 600;
      border: 1px solid ${colors.blue.medium};
      width: 40px;
      height: 37px;
      border-radius: 4px;
      background: white;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding: 7px 12px 9px;

      svg path{
        stroke: ${colors.blue.darker};
      }



  `};
`
