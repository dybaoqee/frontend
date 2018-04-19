import styled from 'styled-components'
import * as colors from 'constants/colors'

export default styled.button`
  background: none;
  border: none;
  box-shadow: none;

  &:hover {
    background: none;
  }

  svg {
    width: 15px;
    text-shadow: 2px 2px 3px #f00;
    text-shadow: 2px 2px 3px #f00;

    path {
      text-shadow: 2px 2px 3px #f00;
      fill: ${({favorite}) => (favorite ? colors.red.medium : 'black')};
      fill-opacity: ${({favorite}) => (favorite ? 1 : 0.2)};
      stroke: white;
      stroke-width: 30;
    }
  }

  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`
