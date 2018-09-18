import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

export default styled.div`
  margin: 40px auto 100px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${mobileMedia} {
    width: calc(100vw - 40px);
  }

  a {
    text-decoration: none;
    color: ${colors.blue.medium};
  }
`
