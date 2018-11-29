import styled from 'styled-components'
import {mobileMedia} from 'constants/media'

export const MapContainer = styled.div`
  position: fixed;
  right: 0;
  overflow: hidden;
  box-sizing: border-box;
  background: white;
  border-radius: 4px;
  width: 420px;
  height: calc(100vh - 178px);
  margin: 20px 0 0 20px;

  @media ${mobileMedia} {
    box-sizing: border-box;
    width: 100% !important;
    border-radius: 0;
    margin: 0;
    top: 0;
    left: 0;
    z-index: 9901;
    left: ${({opened}) => (opened ? 0 : '100%')};
    height: 70%;
    position: absolute;
  }
`

export const Loading = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
