import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'

export const Container = styled(Row)`
  margin: 0 ${theme.space[5]}px ${theme.space[2]}px 0;

  ${Text} {
    margin: 0;
  }
`
