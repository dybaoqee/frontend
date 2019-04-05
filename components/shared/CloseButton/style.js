import styled from 'styled-components'
import theme from 'config/theme'
import Button from '@emcasa/ui-dom/components/Button'

export default styled(Button)`
  background-color: ${({unstyled}) => unstyled ? 'transparent' : null };
  border: ${({unstyled}) => unstyled ? '0' : null };
`
