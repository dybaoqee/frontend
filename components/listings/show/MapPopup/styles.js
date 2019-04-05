import styled from 'styled-components'
import theme from 'config/theme'
import Button from '@emcasa/ui-dom/components/Button'

export default styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${theme.colors.dark};
  display: ${props => props.open ? null : 'none'};

  ${Button} {
    z-index: 5;
  }
`