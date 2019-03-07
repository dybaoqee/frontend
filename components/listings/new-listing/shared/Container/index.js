import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'

const PADDING = `${theme.space[4]}px`

const Container = styled(Row)`
  padding: 80px ${PADDING} ${PADDING} ${PADDING};
  justify-content: center;
`

export default Container
