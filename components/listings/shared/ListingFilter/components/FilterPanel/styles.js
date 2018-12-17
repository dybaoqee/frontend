import styled from 'styled-components'
import theme from '@emcasa/ui'

import View from '@emcasa/ui-dom/components/View'

const OFFSET_TOP = 32

const Container = styled(View)`
  display: ${({show}) => show ? 'block' : 'none'};  
  position: absolute;
  top: ${({top}) => top ? `calc(${top}px - ${OFFSET_TOP}px)` : '0'};
  left: ${({left}) => left ? `${left}px` : '0'};
  background-color: ${theme.colors.white};
  z-index: 1;
` 

export {
  Container
}
