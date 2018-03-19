import * as colors from 'constants/colors'
import styled from 'styled-components'

export default styled.div`
  background: ${colors.orange.light};
  color: ${colors.orange.medium};
  border-bottom: 1px solid ${colors.orange.medium};
  padding: 10px;
  display: flex;
  justify-content: center;

  svg {
    float: left;
    margin-right: 5px;
    padding: 3px 0;
  }
`
