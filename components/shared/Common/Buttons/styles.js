import styled from 'styled-components'
import * as colors from 'constants/colors'

export default styled.button`
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
