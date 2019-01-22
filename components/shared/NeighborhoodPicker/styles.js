import styled from 'styled-components'
import { themeGet } from 'styled-system'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Icon from '@emcasa/ui-dom/components/Icon'

const HEIGHT_TALL = theme.buttonHeight[0]
const HEIGHT_MEDIUM = theme.buttonHeight[1]
const SEARCH_CONTAINER_WIDTH = 560

const SearchContainer = styled(Row)`
  width: 35%;
  max-width: ${SEARCH_CONTAINER_WIDTH}px;
  min-width: 250px;
  height: 100%;
  margin: ${theme.space[4]}px 0 0 ${theme.space[4]}px;

  @media (max-width: ${theme.breakpoints[0]}) {
    width: calc(100% - 52px);
    max-width: none;
  }
`

const InputContainer = styled(Row)`
  cursor: pointer;
  max-width: ${SEARCH_CONTAINER_WIDTH}px;
  border: 1px solid ${({selected}) => selected ? theme.colors.blue : theme.colors.lightGrey}};
  border-radius: ${theme.space[1]}px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${theme.colors.white};
  height: ${HEIGHT_TALL}px;
  box-sizing: border-box;

  @media (max-width: ${theme.breakpoints[0]}) {
    max-width: none;
  }
`

const SearchTextContainer = styled(Row)`
  flex-direction: row;
  align-items: center;
`

export {
  InputContainer,
  SearchContainer,
  SearchTextContainer,
  SEARCH_CONTAINER_WIDTH
}
