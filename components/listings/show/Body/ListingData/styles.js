import styled from 'styled-components'
import theme from '@emcasa/ui'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const Separator = styled.div`
  border-top: 1px solid ${theme.colors.lightGrey};
  margin: ${theme.space[2]}px 0 ${theme.space[4]}px 0;
`
