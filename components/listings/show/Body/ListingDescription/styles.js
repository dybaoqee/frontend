import styled from 'styled-components'
import theme from 'config/theme'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import {breakpoint} from '@emcasa/ui/lib/styles'

export default styled(Col)`
  flex: 1 1 100%;

  ${Text} {
    margin: 0 0 ${theme.space[5]}px;
  }
`

export const TitleText = Text.withComponent('h3')
export const Title = styled(TitleText)`
  margin: 0 0 ${theme.space[5]}px;
`
