import styled from 'styled-components'
import {blue} from 'constants/colors'

export default styled.div`
  box-sizing: border-box;
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid ${blue.medium};
  border-radius: 4px;
  margin: -8px 10px 10px 10px;
  padding: 10px;
`

export const Title = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  color: ${blue.medium};
  font-size: 14px;
  width: auto;
  display: flex;
  justify-content: space-between;
  user-select: none;

  svg {
    width: 20px !important;
    height: 20px;
  }
`

export const Info = styled.p`
  overflow: hidden;
  max-height: ${({opened}) => (opened ? '1200px' : '0')};
  transition: max-height 0.5s;
  margin: 0;
  cursor: pointer;
`
