import styled from 'styled-components'
import theme from '@emcasa/ui'
import Button from '@emcasa/ui-dom/components/Button'
import Icon from '@emcasa/ui-dom/components/Icon'

const SIZE = 32

const StyledExpandButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid ${theme.colors.lightGrey};
  color: ${({active}) => active ? theme.colors.white : theme.colors.pink};
  font-size: ${theme.fontSizes[1]}px;
  margin: 0 ${theme.space[4]}px ${theme.space[1]}px 0;
  width: ${SIZE}px;
  height: ${SIZE}px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const ArrowIcon = styled(Icon)`
  display: flex;
  align-items: center;
  height: ${SIZE / 2}px;
`

export {
  StyledExpandButton,
  ArrowIcon,
  SIZE
}
