import styled from 'styled-components'
import { themeGet } from 'styled-system'

const StyledImage = styled.img`
  width: 100%;
  border-radius: 4px;
  margin-bottom: ${themeGet('space.3')}px;
`

export default StyledImage
