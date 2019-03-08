import styled from 'styled-components'
import theme from '@emcasa/ui'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Row from '@emcasa/ui-dom/components/Row'

const PADDING = `${theme.space[4]}px`

const Container = styled(Row)`
  width: calc(100vw - 40px);
  padding: 80px ${PADDING} ${PADDING} ${PADDING};
  justify-content: center;
`

export default Container
