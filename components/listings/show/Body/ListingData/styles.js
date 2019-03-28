import styled from 'styled-components'
import theme from '@emcasa/ui'
import {breakpoint} from '@emcasa/ui/lib/styles'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media screen and ${breakpoint.up('tablet')} {
    justify-content: space-between;
  }
`
