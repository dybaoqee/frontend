import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

export default styled.div`
  margin: 30px 40px;

  @media ${mobileMedia} {
    order: -1;
  }
  span {
    margin-left: 10px;
    color: ${colors.gray4a};
    font-size: 14px;
    font-weight: 500;
  }
  svg {
    width: 15px !important;
    height: 15px;
    path {
      fill: ${colors.green.medium};
    }
  }
`
