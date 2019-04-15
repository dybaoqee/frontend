import styled from 'styled-components'
import theme from 'config/theme'
import {zIndexModal} from 'constants/zIndex'

export default styled.div`
  z-index: ${zIndexModal};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${theme.colors.dark};
  display: ${props => props.open ? null : 'none'};
`