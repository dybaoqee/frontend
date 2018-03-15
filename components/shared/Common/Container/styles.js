import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

export default styled.div`
  margin: 0 auto 100px;
  padding-top: 40px;
  width: 400px;

  @media ${mobileMedia} {
    width: calc(100vw - 40px);
  }

  a {
    text-decoration: none;
    color: ${colors.blue.medium};
  }
`
