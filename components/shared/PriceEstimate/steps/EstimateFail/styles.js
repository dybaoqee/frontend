import styled from 'styled-components'
import {gray4a} from 'constants/colors'

export default styled.div``

export const Title = styled.p`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 22px;
  color: ${gray4a};
`

export const Address = styled.p`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  margin: 0;
`

export const Description = styled.div`
  box-sizing: border-box;

  h6 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
  }
`
