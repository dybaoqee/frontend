import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {zIndexModal} from 'constants/zIndex'

export default styled.div`
  z-index: ${zIndexModal};
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.open ? null : 'none')};
  width: 100%;
  height: 100%;
  background: ${themeGet('colors.dark')};
`
