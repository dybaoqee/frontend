import styled from 'styled-components'
import { themeGet } from 'styled-system'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Icon from '@emcasa/ui-dom/components/Icon'

const HEIGHT_TALL = theme.buttonHeight[0]
const HEIGHT_MEDIUM = theme.buttonHeight[1]

const SearchResultItem = styled(View)`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: ${themeGet('space.1')}px;
  height: ${(props) => (props.height && props.height === 'medium') ? HEIGHT_MEDIUM : HEIGHT_TALL}px;
  border: 1px solid ${themeGet('colors.lightGrey')};
  border-radius: ${themeGet('space.1')}px;
  background-color: ${themeGet('colors.white')};
  cursor: pointer;
  :hover {
    border: 1px solid ${themeGet('colors.pink')};
  }
  
  overflow: hidden;
  white-space: nowrap;
  
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
  }
`

const SearchResultContainer = styled(Row)`
  position: absolute;
  z-index: 1;
  width: ${({width}) => width ? `${width}px` : '100%'};
  max-height: 220px;
  overflow-y: scroll;
  overflow-x: hidden;
`

const InputContainer = styled(Row)`
  border: 1px solid ${themeGet('colors.lightGrey')};
  border-radius: ${themeGet('space.1')}px;
  display: flex;
  align-items: center;
  background-color: ${themeGet('colors.white')};
`

const BackIcon = styled(Icon)`
  margin: ${themeGet('space.1')}px ${themeGet('space.3')}px 0 ${themeGet('space.3')}px;
`

const MobieTypeaheadContainer = styled(Row)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  background-color: ${themeGet('colors.white')};
`

export {
  MobieTypeaheadContainer,
  SearchResultItem,
  SearchResultContainer,
  InputContainer,
  BackIcon
}
