import styled from 'styled-components'
import theme from 'config/theme'

export default styled.div`
  height: 240px;
  margin: 40px auto 0;
  width: 960px;
  max-width: calc(100vw - ${theme.space[4] * 2}px);
  border-radius: 4px;
  overflow: hidden;
`
