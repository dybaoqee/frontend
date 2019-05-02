import styled from 'styled-components'
import theme from '@emcasa/ui'
import Button from '@emcasa/ui-dom/components/Button'
import Icon from '@emcasa/ui-dom/components/Icon'

export const StyledCloseButton = styled(Button)`
  z-index: 5;
  position: absolute;
  top: ${theme.space[2]}px;
  right: ${theme.space[2]}px;
  background-color: ${({justIcon}) => justIcon ? 'initial' : null};
  border: ${({justIcon}) => justIcon ? '0' : null};
`

export const CloseIcon = styled(Icon)`
  ${({color}) => color && `
    svg, path {
      :hover {
        background-color: transparent;
      }
    }

    :hover {
      background-color: transparent;
    }
  `}
`
