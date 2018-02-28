import styled from 'styled-components'

import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.button`
  background-color: ${(props) => (props.light ? 'white' : colors.blue)};
  color: ${(props) => (props.light ? colors.blue : 'white')};

  &:hover {
    background-color: ${(props) => (props.light ? 'white' : '')};
  }

  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`
