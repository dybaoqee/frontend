import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'

const SEARCH_CONTAINER_WIDTH = 560

const SearchContainer = styled(Row)`
  width: 35%;
  max-width: ${SEARCH_CONTAINER_WIDTH}px;
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
  height: ${theme.buttonHeight[0]}px;
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
