import styled from 'styled-components'
import * as colors from 'constants/colors'

export default styled.ul`
  color: ${colors.red};
  padding: 0;
`

export const Error = styled.li`
  background-color: blue;
  :before {
    content: '· ';
  }
`
