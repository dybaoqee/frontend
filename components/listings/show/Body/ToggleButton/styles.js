import styled from 'styled-components'
import theme from '@emcasa/ui'
import Button from '@emcasa/ui-dom/components/Button'
import Icon from '@emcasa/ui-dom/components/Icon'

const WIDTH = 44
const HEIGHT = 32

const StyledToggleButton = styled(Button)`
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
  border: 1px solid ${theme.colors.lightGrey};
  color: ${({active}) => active ? theme.colors.white : theme.colors.pink};
  font-size: ${theme.fontSizes[1]}px;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  justify-content: center;
  align-items: center;

  @media (max-width: ${theme.breakpoints[0]}) {
    display: flex;
  }
`

const ArrowIcon = styled(Icon)`
  display: flex;
  align-items: center;
  height: ${HEIGHT / 2}px;
`

export {
  StyledToggleButton,
  ArrowIcon
}
