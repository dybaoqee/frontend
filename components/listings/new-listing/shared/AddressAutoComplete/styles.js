import styled from 'styled-components'
import { themeGet } from 'styled-system'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Icon from '@emcasa/ui-dom/components/Icon'

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

const MARGIN_RIGHT = '20px'
const MOBILE_MARGIN = '40px'
const SearchResultContainer = styled(Row)`
  position: absolute;
  z-index: 1;
  width: calc(50vw - ${MARGIN_RIGHT});
  @media only screen and (max-width: ${themeGet('breakpoints.0')}) {
    width: calc(100vw - ${MOBILE_MARGIN});
  }
`

const InputContainer = styled(Row)`
  border: 1px solid ${themeGet('colors.lightGrey')};
  border-radius: ${themeGet('space.1')}px;
  display: flex;
  align-items: center;
`

const BackIcon = styled(Icon)`
  margin: ${themeGet('space.1')}px ${themeGet('space.3')}px 0 ${themeGet('space.3')}px;
`

export {
  SearchResultItem,
  SearchResultContainer,
  InputContainer,
  BackIcon
}
