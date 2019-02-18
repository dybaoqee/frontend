import styled from 'styled-components'
import theme from '@emcasa/ui'

export default styled.div`
  height: 240px;
  margin: 40px auto 0;
  max-width: 960px;

  @media (max-width: ${theme.breakpoints[0]}) {
    padding: 0 ${theme.space[4]}px 0 ${theme.space[4]}px;
  }
`
