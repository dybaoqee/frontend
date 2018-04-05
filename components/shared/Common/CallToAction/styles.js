import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

export default styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  margin-bottom: 40px;
  a {
    color: ${colors.blue.medium};
    font-size: 20px;
    text-align: center;
    text-decoration: none;
  }
`
