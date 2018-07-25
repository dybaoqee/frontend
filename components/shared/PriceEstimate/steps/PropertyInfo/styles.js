import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import {Field} from 'components/listings/shared/styles'

const FieldContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  [aria-label='area'] {
    width: 100%;
  }

  [aria-label='rooms'],
  [aria-label='bathrooms'],
  [aria-label='garage_spots'] {
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
