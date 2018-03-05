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
  > ${Field}:nth-child(n + 8) {
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
  color: ${colors.orange};
  padding: 0;

  > li:before {
    content: '· ';
  }
`

export {FieldContainer}
