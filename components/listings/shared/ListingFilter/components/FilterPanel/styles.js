import styled from 'styled-components'
import { themeGet } from 'styled-system'

import View from '@emcasa/ui-dom/components/View'

const OFFSET_TOP = 32

const Container = styled(View)`
  display: ${({show}) => show ? 'block' : 'none'};  
  position: absolute;
  top: ${({top}) => top ? `calc(${top}px - ${OFFSET_TOP}px)` : '0'};
  left: ${({left}) => left ? `${left}px` : '0'};
  background-color: ${themeGet('colors.white')};
  z-index: 1;
` 

export {
  Container
}
