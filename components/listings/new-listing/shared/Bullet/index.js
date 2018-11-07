import styled from 'styled-components'
import { themeGet } from 'styled-system'

const Bullet = styled.div`
  position: absolute;
  box-sizing: border-box;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 50%;
  border: 2px solid ${themeGet('colors.grey')};
  width: 20px;
  height: 20px;
`

export default Bullet
