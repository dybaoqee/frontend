import styled from 'styled-components'
import { themeGet } from 'styled-system'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'

const SearchResultItem = styled(View)`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: ${themeGet('space.1')}px;
  height: ${themeGet('buttonHeight.0')}px;
  border: 1px solid ${themeGet('colors.lightGrey')};
  border-radius: ${themeGet('space.1')}px;
  background-color: ${themeGet('colors.white')};
  cursor: pointer;
  :hover {
    border: 1px solid ${themeGet('colors.pink')};
  }
`

// TODO: use styled system breakpoints
const SearchResultContainer = styled(Row)`
  position: absolute;
  z-index: 1;
  width: calc(50vw - 38px);
  @media only screen and (max-width: 600px) {
    width: calc(100vw - 38px);
  }
`

export { SearchResultItem, SearchResultContainer }
