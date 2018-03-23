import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'

const SearchResults = styled.div`
  z-index: 2;
  font-weight: 500;
  font-size: 14px;
  background-color: white;
  min-width: 100%;
  position: absolute;
  top: 85%;

  @media ${mobileMedia} {
    top: 75%;
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

const SearchResult = styled.div`
  border: 1px solid ${colors.lightGray};
  font-size: 14px;
  border-top: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? colors.lightGray : 'white')};

  p {
    margin: 0;
  }

  span {
    font-weight: 600;
  }

  :hover {
    background-color: ${colors.lightGray};
  }
`

export {SearchResults, FieldContainer, SearchResult}
