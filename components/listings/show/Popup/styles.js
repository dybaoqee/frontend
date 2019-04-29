import styled from 'styled-components'
import theme from 'config/theme'
import {zIndexModal} from 'constants/zIndex'

export default styled.div`
  z-index: ${zIndexModal + 100};
  position: fixed;
  top: 0;
  left: 0;
  display: ${props => props.open ? null : 'none'};
  width: 100%;
  height: 100%;
  background: ${theme.colors.white};
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
`

export const Background = styled.div`
  width: 100%;
  height: 100%;
`