import styled from 'styled-components'
import {themeGet} from 'styled-system'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Icon from '@emcasa/ui-dom/components/Icon'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import {breakpoint} from '@emcasa/ui/lib/styles'

const MARGINS = (props) => themeGet('space.4')(props) * 2

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
  border: 1px solid
    ${({selected, ...props}) => {
      return selected 
        ? themeGet('colors.blue')(props) 
        : themeGet('colors.lightGrey')(props)
    }};
  border-radius: ${themeGet('space.1')}px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${themeGet('colors.white')};
  height: ${themeGet('buttonHeight.0')}px;
  box-sizing: border-box;

  @media ${breakpoint.down('tablet')} {
    max-width: none;
  }
`

const SearchTextContainer = styled(Row)`
  max-width: calc(100% - 42px);
  flex-direction: row;
  align-items: center;

  @media ${breakpoint.down('tablet')} {
    width: calc(100% - ${MARGINS}px);
  }
`

const BackIcon = styled(Icon)`
  margin: ${themeGet('space.1')}px ${themeGet('space.3')}px 0
    ${themeGet('space.3')}px;
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
  ButtonText
}
