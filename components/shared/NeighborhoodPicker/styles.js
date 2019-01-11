import styled from 'styled-components'
import { themeGet } from 'styled-system'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Icon from '@emcasa/ui-dom/components/Icon'

const HEIGHT_TALL = theme.buttonHeight[0]
const HEIGHT_MEDIUM = theme.buttonHeight[1]

const SearchContainer = styled(Row)`
  width: 560px;
  height: 100%;
`

const InputContainer = styled(Row)`
  cursor: pointer;
  max-width: 560px;
  border: 1px solid ${theme.colors.lightGrey};
  border-radius: ${theme.space[1]}px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${theme.colors.white};
  height: ${HEIGHT_TALL}px;
  box-sizing: border-box;
`

const SearchTextContainer = styled(Row)`
  flex-direction: row;
  align-items: center;
`

export {
  InputContainer,
  SearchContainer,
  SearchTextContainer
}
