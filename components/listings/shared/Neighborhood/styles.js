import styled from 'styled-components'
import { themeGet } from 'styled-system'

export const Container = styled.div`
  box-sizing: border-box;
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #E0E6ED;
  border-radius: 4px;
  margin: 0 ${themeGet('space.4')}px ${themeGet('space.4')}px 0;
  padding: 10px;
`

export const Title = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  color: #979797;
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
  color: #979797;
  font-size: 12px;
  padding-top: ${({opened}) => (opened ? '10px' : '0')};
  max-height: ${({opened}) => (opened ? '1200px' : '0')};
  transition: max-height 0.5s;
  margin: 0;
  cursor: pointer;
`
