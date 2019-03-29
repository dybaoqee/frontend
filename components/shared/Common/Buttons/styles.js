import styled from 'styled-components'
import * as colors from 'constants/colors'

const LegacyButton = styled.button`
  background-color: ${colors.blue.medium};
  border: 1px solid ${colors.blue.darker};
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  outline: none;
  padding: 10px 20px 12px;
  text-decoration: none;
  transition: background-color 0.1s ease;
  transform: 0.25;
  &:hover {
    background-color: ${colors.blue.dark};
    text-decoration: none;
  }
`

export const BaseButton = LegacyButton.extend`
  font-size: 14px;
  font-weight: 600;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px 0px rgba(38, 38, 38, 0.2);
  padding: 7px 12px 9px;
`

export default BaseButton.extend`
  background-color: ${({light, secondary}) =>
    light ? 'white' : secondary ? colors.green.medium : colors.blue.medium};
  color: ${({light, secondary}) =>
    !light ? 'white' : secondary ? colors.green.medium : colors.blue.medium};
  width: ${({full}) => (full ? '100%' : '')};

  border: 1px solid
    ${({secondary, light}) =>
      secondary
        ? colors.green.dark
        : light ? colors.blue.medium : colors.blue.darker};

  &:hover {
    background-color: ${({light, secondary}) =>
      light ? 'white' : secondary ? colors.green.dark : ''};
  }

  svg {
    width: 15px !important;
    height: 15px;
  }

  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`
