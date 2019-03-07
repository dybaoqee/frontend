import styled from 'styled-components'
import theme from 'config/theme'
import {breakpoint} from '@emcasa/ui/lib/styles'

export default styled.div`
  height: 240px;
  margin: 40px auto 0;
  max-width: 960px;

  @media ${breakpoint.down('tablet')} {
    padding: 0 ${theme.space[4]}px 0 ${theme.space[4]}px;
  }
`
