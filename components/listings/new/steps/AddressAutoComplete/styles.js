import styled from 'styled-components'
import * as colors from 'constants/colors'

const SearchResults = styled.div`
  z-index: 10;
  font-weight: 600;
  font-size: 14px;
  background-color: white;
  min-width: 100%;
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

export {SearchResults}
