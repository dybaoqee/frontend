import styled from 'styled-components'
import * as colors from 'constants/colors'

export default styled.div`
  background: none;
  border: none;
  box-shadow: none;
  box-sizing: border-box;

  &:hover {
    background: none;
  }

  svg {
    width: 15px;
    text-shadow: 2px 2px 3px #f00;
    text-shadow: 2px 2px 3px #f00;

    path {
      text-shadow: 2px 2px 3px #f00;
      fill: ${({favorite}) => (favorite ? colors.red.medium : 'white')};
      fill-opacity: ${({favorite}) => (favorite ? 1 : 0)};
      stroke: ${({secondary}) => (secondary ? 'black' : 'white')};
      stroke-width: 30;
    }
  }

  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`
