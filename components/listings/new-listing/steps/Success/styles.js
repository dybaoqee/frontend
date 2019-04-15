import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'

export const Box = styled(Row)`
  border: 1px solid ${theme.colors.lightGrey};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
`

export const Bullet = styled.li`
  margin-bottom: ${theme.space[2]}px;
`
