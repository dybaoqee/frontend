import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import {Field} from '../../shared/styles'

const FieldContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(6, minmax(50px, 1fr));
  grid-gap: 20px;

  > ${Field}:nth-child(1) {
    grid-column: span 2;
  }

  > ${Field}:nth-child(2) {
    grid-column: span 3;
  }

  > ${Field}:nth-child(n + 4):not(:nth-child(n + 10)) {
    grid-column: span 2;
  }

  @media ${mobileMedia} {
    display: block;

    > ${Field} {
      margin-bottom: 10px;
    }
  }
`

export {FieldContainer}
