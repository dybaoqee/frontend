import styled from 'styled-components'
import View from '@emcasa/ui-dom/components/View'
import {breakpoint} from '@emcasa/ui/lib/styles'

export const Container = styled(View)`
  position: fixed;
  background-color: white;
  width: 360px;
  height: 640px;
  z-index: 1;

  @media ${breakpoint.only('mobile')} {
    width: 100%;
    height: 100%;
  }
`
