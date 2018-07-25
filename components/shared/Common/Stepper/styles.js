import {blue} from 'constants/colors'
import {mobileMedia} from 'constants/media'
import styled from 'styled-components'

export default styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
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

  opacity: ${({active}) => (active ? 1 : 0.6)};
`

export const Divider = styled.div`
  background: ${blue.medium};
  color: white;
  height: 3px;
  flex: 1;
  opacity: ${({active}) => (active ? 1 : 0.6)};
`
