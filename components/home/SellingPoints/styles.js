import * as colors from 'constants/colors'
import {headerMobileMedia} from 'constants/media'
import styled from 'styled-components'

export default styled.div`
  padding-top: 60px;

  h1 {
    font-weight: 300;
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
      h2 {
        color: ${colors.blue.medium};
        font-weight: 300;
      }
      p {
        color: ${colors.mediumDarkGray};
        line-height: 1.8em;
      }
    }
  }

  @media ${headerMobileMedia} {
    > div {
      margin: 0 20px 60px;
      grid-template-columns: 1fr;
      div {
        margin-bottom: 40px;
        width: calc(100% - 40px);
      }
    }
  }
`
