import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import styled from 'styled-components'

export default styled.div`
  align-items: center;
  border-top: 1px solid ${colors.lightGray};
  display: flex;
  clear: both;
  flex-direction: column;
  overflow: auto;
  padding-top: 40px;

  > h1 {
    font-weight: 300;
    text-align: center;
  }

  > p {
    color: ${colors.mediumDarkGray};
    font-size: 16px;
    line-height: 1.6em;
    margin-bottom: 60px;
    max-width: 500px;
    text-align: center;
  }

  @media ${mobileMedia} {
    > h1,
    > p {
      max-width: calc(100vw - 40px)
    }
  }
`
