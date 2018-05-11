import * as colors from 'constants/colors'
import {headerMobileMedia} from 'constants/media'
import styled from 'styled-components'

export default styled.div`
  padding-top: 60px;

  h1 {
    font-weight: 300;
    margin-bottom: 60px;
    text-align: center;
    padding: 0 20px;
  }

  > div {
    display: grid;
    margin: 0 20px 60px;
    grid-template-columns: repeat(auto-fit, 280px);
    grid-gap: 20px;
    justify-content: center;
    div {
      width: 100%;
      p {
        color: ${colors.mediumDarkGray};
        line-height: 1.8em;
        text-align: center;
      }
    }
  }

  svg {
    display: block;
    height: 70px;
    margin: 0 auto 30px;
    width: 70px !important;
  }

  [data-icon='file'] {
    path {
      color: ${colors.blue.medium};
      stroke: ${colors.blue.darker};
      stroke-width: 10;
    }
  }
  [data-icon='desktop'] {
    path {
      color: ${colors.orange.medium};
    }
  }
  [data-icon='dollar-sign'] {
    path {
      color: ${colors.green.medium};
    }
  }

  @media ${headerMobileMedia} {
    > div {
      margin: 0 20px 60px;
      grid-template-columns: 1fr;
      div {
        margin: 0 auto 40px;
        width: calc(100% - 40px);
      }
    }
  }
`
