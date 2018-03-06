import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

const SearchResults = styled.div`
  z-index: 2;
  font-weight: 600;
  font-size: 14px;
  background-color: white;
  min-width: 100%;
  position: absolute;
  top: 100%;
  @media ${mobileMedia} {
    top: 90%;
  }
  > div {
    border: 1px solid ${colors.lightGray};
    box-sizing: border-box;
    width: 100%;
    min-height: 30px;
    padding: 5px;
    cursor: pointer;

    &:hover {
      background-color: ${colors.lightestGray};
    }
  }
`

const FieldContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 20px;

  @media ${mobileMedia} {
    display: block;
  }
`

export {SearchResults, FieldContainer}
