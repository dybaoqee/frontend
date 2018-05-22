import styled from 'styled-components'

import {headerMobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.div`
  height: 46px;
  background: ${colors.grayf0};
  border-bottom: 1px solid ${colors.lightestGray};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 19px;
  color: ${colors.gray4a};

  .mobile {
    display: none;
  }

  a {
    text-decoration: none;
    color: ${colors.blue.medium};
  }

  p {
    margin: 0;
  }

  @media ${headerMobileMedia} {
    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
      width: 100%;
      padding: 0 20px;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
`
