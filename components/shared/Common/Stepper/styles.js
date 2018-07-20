import {blue} from 'constants/colors'
import {mobileMedia} from 'constants/media'
import styled from 'styled-components'

export default styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border: 1px solid red;
  width: 100%;
  max-width: 280px;
`

export const Step = styled.div`
  background: ${blue.medium};
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;

  opacity: ${({current}) => (current ? 1 : 0.5)};
`
