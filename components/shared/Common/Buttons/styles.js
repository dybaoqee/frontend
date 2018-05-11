import styled from 'styled-components'
import * as colors from 'constants/colors'

export const BaseButton = styled.button`
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Helvetica, Arial, sans-serif;
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
    margin-right: 5px;
    width: 15px;
  }

  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`
