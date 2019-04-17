import styled from 'styled-components'
import theme from 'config/theme'

export default styled.svg`
  display: block;
  width: 100%;
`

export const IconPath = styled.path`
  fill: ${({fill}) => fill ? fill : theme.colors.pink};
`

export const TextPath = styled.path`
  fill: ${({fill}) => fill ? fill : theme.colors.dark};
`