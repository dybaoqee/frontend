import * as colors from 'constants/colors'
import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import _ from 'lodash'

export default styled.div`
  font-size: 14px;
  font-weight: normal;
  background: ${(props) => {
    const color = _.pickBy(props, (value) => Number(value))
    const colorName = Object.keys(color)[0] || 'blue'
    return colors[colorName].light
  }};
  > * {
    padding: 0;
    margin: 0;
  }

  padding: 10px 120px;

  span {
    font-weight: bold;
  }

  @media ${mobileMedia} {
    padding: 10px 30px;
  }
`
