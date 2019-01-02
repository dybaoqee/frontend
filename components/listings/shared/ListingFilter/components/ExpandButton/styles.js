import styled from 'styled-components'
import theme from '@emcasa/ui'
import Button from '@emcasa/ui-dom/components/Button'

const EXPAND_BUTTON_WIDTH = 48

const StyledExpandButton = styled(Button)`
  position: fixed;
  right: 0;
  border: 1px solid ${theme.colors.pink};
  color: ${({active}) => active ? theme.colors.white : theme.colors.pink};
  font-size: ${theme.fontSizes[1]}px;
  margin: 0 ${theme.space[4]}px ${theme.space[1]}px 0;
  width: ${EXPAND_BUTTON_WIDTH}px;
  height: 32px;

  @media screen and (min-width: ${theme.breakpoints[0]}) {
    display: none;
  }
`

export {
  StyledExpandButton,
  EXPAND_BUTTON_WIDTH
}
