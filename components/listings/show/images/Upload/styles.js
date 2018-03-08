import styled from 'styled-components'

import * as colors from 'constants/colors'

export default styled.div`
  clear: both;
  > div {
    border-color: ${colors.lightestGray} !important;
    align-items: center;
    display: flex;
    margin-bottom: 20px;
    justify-content: center;
    width: calc(100% - 4px) !important;
  }
`
