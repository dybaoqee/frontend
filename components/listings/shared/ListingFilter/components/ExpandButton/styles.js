import styled from 'styled-components'
import theme from 'config/theme'
import Button from '@emcasa/ui-dom/components/Button'
import Icon from '@emcasa/ui-dom/components/Icon'

const EXPAND_BUTTON_SIZE = 32

const StyledExpandButton = styled(Button)`
  position: fixed;
  right: 0;
  border: 1px solid ${theme.colors.lightGrey};
  color: ${({active}) => active ? theme.colors.white : theme.colors.pink};
  font-size: ${theme.fontSizes[1]}px;
  margin: 0 ${theme.space[4]}px ${theme.space[1]}px 0;
  width: ${EXPAND_BUTTON_SIZE}px;
  height: ${EXPAND_BUTTON_SIZE}px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    display: none;
  }
`

const ArrowIcon = styled(Icon)`
  display: flex;
  align-items: center;
  height: ${EXPAND_BUTTON_SIZE / 2}px;
`

export {
  StyledExpandButton,
  ArrowIcon,
  EXPAND_BUTTON_SIZE
}
