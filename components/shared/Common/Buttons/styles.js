import styled from 'styled-components'
import * as colors from 'constants/colors'

export default styled.button`
  background-color: ${({light, secondary}) =>
    light ? 'white' : secondary ? colors.green : colors.blue};
  color: ${(props) => (props.light ? colors.blue : 'white')};
  width: ${({full}) => (full ? '100%' : '')};

  border: 1px solid
    ${({secondary}) => (secondary ? colors.darkenedGreen : colors.blue)};

  font-weight: 600;

  &:hover {
    background-color: ${({light, secondary}) =>
      light ? 'white' : secondary ? colors.darkenedGreen : ''};
  }

  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`
