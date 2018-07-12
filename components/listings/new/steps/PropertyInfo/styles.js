import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import {Field} from 'components/listings/shared/styles'

const FieldContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(6, minmax(50px, 1fr));
  grid-gap: 20px;

  [aria-label='phone'] {
    grid-column: span 6;
  }

  [aria-label='type'] {
    grid-column: span 4;
  }

  [aria-label='floor'] {
    grid-column: span 2;
  }

  [aria-label='property_tax'],
  [aria-label='maintenance_fee'],
  [aria-label='area'],
  [aria-label='rooms'],
  [aria-label='bathrooms'],
  [aria-label='garage_spots'],
  [aria-label='price'],
  [aria-label='matterport_code'],
  [aria-label='score'] {
    grid-column: span 2;
  }

  [aria-label='description'],
  [aria-label='phone'] {
    grid-column: span 6;
  }

  @media ${mobileMedia} {
    display: block;

    > ${Field} {
      margin-bottom: 10px;
    }
  }
`

export const TextArea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  padding: 10px;
  min-height: 97px;
  resize: vertical;
  width: 100%;
`
export const SuggestionList = styled.ul`
  list-style-type: none;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.orange.medium};
  padding: 0;

  > li:before {
    content: '· ';
  }
`

export {FieldContainer}
