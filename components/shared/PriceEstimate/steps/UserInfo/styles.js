import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import {Field} from 'components/listings/shared/styles'

const FieldContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media ${mobileMedia} {
    display: block;

    > ${Field} {
      margin-bottom: 10px;
    }
  }
`

export {FieldContainer}
