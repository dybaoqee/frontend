import styled from 'styled-components'
import { themeGet } from 'styled-system'

import View from '@emcasa/ui-dom/components/View'

const Container = styled(View)`
  display: ${({show}) => show ? 'block' : 'none'};  
  position: absolute;
  top: 60px;
  left: 0;
  background-color: ${themeGet('colors.white')};
` 

export {
  Container
}
