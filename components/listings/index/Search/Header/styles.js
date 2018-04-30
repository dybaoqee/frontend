import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.div`
  span {
    color: ${colors.mediumDarkGray};
    padding-left: 20px;
    padding-right: 30px;
  }
  span.filter-title {
    color: ${colors.mediumDarkGray};
    padding-left: 20px;
    padding-right: 30px;
  }

  .mobile-filter-toggler {
    display: none;
  }

  @media ${mobileMedia} {
    span {
      display: none;
      padding: 0 10px;
    }
    div.mobile-control-container {
      align-items: center;
      display: flex;
      justify-content: space-between;
      width: 100vw;

      button {
        margin-left: 10px;
        margin-right: 0;
        padding-left: 10px;
        padding-right: 10px;
      }

      button.mobile-filter-toggler {
        display: block;
        margin-left: 10px;
      }
    }

    span.filter-title {
      display: none;
    }
  }
`
