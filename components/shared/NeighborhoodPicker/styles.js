import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Icon from '@emcasa/ui-dom/components/Icon'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'

const SEARCH_CONTAINER_MAX_WIDTH = 560
const MARGINS = theme.space[4] * 2

const SearchContainer = styled(Row)`
  width: 35%;
  max-width: ${SEARCH_CONTAINER_MAX_WIDTH}px;
  height: 100%;
  margin: ${({mobile}) => mobile ? `0` : `${theme.space[4]}px 0 0 ${theme.space[4]}px`};

  @media (max-width: ${theme.breakpoints[0]}) {
    width: ${({mobile}) => mobile ? `100%` : `calc(100% - 52px)`};
    max-width: none;
  }
`

const InputWrapper = styled(Col)`
  width: 100%;
  height: ${theme.buttonHeight[1]}px;
  z-index: 1;
`

const InputContainer = styled(Row)`
  cursor: pointer;
  max-width: ${SEARCH_CONTAINER_MAX_WIDTH}px;
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
  max-width: calc(100% - 42px);
  flex-direction: row;
  align-items: center;

  @media (max-width: ${theme.breakpoints[0]}) {
    width: calc(100% - ${MARGINS}px);
  }
`

const BackIcon = styled(Icon)`
  margin: ${theme.space[1]}px ${theme.space[3]}px 0 ${theme.space[3]}px;
`

const BackButton = styled(Button)`
  width: 48px;
  height: 48px;
  padding: 0;
  margin: 0;
  border: 0;
`

const ButtonText = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export {
  InputWrapper,
  InputContainer,
  SearchContainer,
  SearchTextContainer,
  BackIcon,
  BackButton,
  ButtonText,
  SEARCH_CONTAINER_MAX_WIDTH
}
