import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import {Field} from '../../shared/styles'

const FieldContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 20px;

  @media ${mobileMedia} {
    display: block;
    grid-template-columns: 1fr;
  }

  > ${Field}:first-of-type {
    grid-column: 1 / 4;
  }

  > ${Field}:nth-child(5) {
    grid-column: 1 / 3;
  }
`

export {FieldContainer}
