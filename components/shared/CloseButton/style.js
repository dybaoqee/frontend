import styled from 'styled-components'
import {themeGet} from 'styled-system'
import Button from '@emcasa/ui-dom/components/Button'

export default styled(Button)`
  z-index: 5;
  position: absolute;
  top: ${themeGet('space.2')}px;
  right: ${themeGet('space.2')}px;
  background-color: ${({unstyled}) => (unstyled ? 'transparent' : null)};
  border: ${({unstyled}) => (unstyled ? '0' : null)};
`
