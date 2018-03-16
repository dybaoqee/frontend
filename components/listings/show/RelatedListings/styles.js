import * as colors from 'constants/colors'
import styled from 'styled-components'

import {mobileMedia} from 'constants/media'

export default styled.div`
  width: 100%;
  height: auto;
  background: ${colors.offWhite};
  &::before {
    content: ' ';
    display: table;
  }
  > div {
    padding-top: 25px !important;
  }
  @media ${mobileMedia} {
    > h3 {
      width: calc(100% - 40px);
    }
  }
`
