import styled from 'styled-components'
import * as colors from 'constants/colors'

export const BaseButton = styled.button`
  font-weight: 600;
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  max-width: 80%;
`

export default BaseButton.extend`
  background-color: ${({light, secondary}) =>
    light ? 'white' : secondary ? colors.green.medium : colors.blue.medium};
  color: ${({light, secondary}) =>
    !light ? 'white' : secondary ? colors.green.medium : colors.blue.medium};
  width: ${({full}) => (full ? '100%' : '')};

  border: 1px solid
    ${({secondary}) => (secondary ? colors.green.dark : colors.blue.medium)};

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
