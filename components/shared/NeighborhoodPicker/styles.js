import styled from 'styled-components'
import theme from '@emcasa/ui'
import posed from 'react-pose'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Icon from '@emcasa/ui-dom/components/Icon'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import View from '@emcasa/ui-dom/components/View'

const MARGINS = theme.space[4] * 2

const SearchContainer = styled(Row)`
  height: 100%;
  width: 100%;
`

const InputWrapper = styled(Col)`
  width: 100%;
  height: 60px;
  z-index: 2;
`

const InputContainer = styled(Row)`
  cursor: pointer;
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

const Background = styled(View)`
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(255, 255, 255, 0.5);
`

const DURATION = 300

const Animated = posed.div({
  enter: { opacity: 1, transition: { duration: DURATION }},
  exit: { opacity: 0, transition: { duration: DURATION }},
})

export {
  InputWrapper,
  InputContainer,
  SearchContainer,
  SearchTextContainer,
  BackIcon,
  BackButton,
  ButtonText,
  Background,
  Animated
}
