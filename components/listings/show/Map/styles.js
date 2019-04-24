import styled from 'styled-components'
import theme from 'config/theme'

export default styled.div`
  z-index: 1;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export const AlertText = styled.span`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  padding: ${theme.space[2]}px ${theme.space[3]}px;
  background-color: ${theme.colors.dark};
  border-radius: 5px;
  text-align: center;
`
