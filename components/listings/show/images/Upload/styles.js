import styled from 'styled-components'

import * as colors from 'constants/colors'

export default styled.div`
  border: 2px dashed ${colors.lightGray};
  border-radius: 4px;
  cursor: pointer;
  align-items: center;
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
  position: relative;
  height: 300px !important;
  width: calc(100% - 4px) !important;
`

export const ContainerDropZone = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  min-width: 100%;
  position: relative;
  > div {
    box-sizing: inherit;
    border: none !important;
    min-width: 100%;
    height: auto !important;
    position: relative;
  }
`

export const Tiles = styled.div`
  display: grid;
  grid-template-columns: calc(33.3333% - 6px) calc(33.3333% - 6px) calc(
      33.333% - 6px
    );
  grid-gap: 9px;
  position: absolute;
  height: calc(100% - 50px);
  width: calc(100% - 50px);
  z-index: -1;
`

export const Tile = styled.div`
  background: ${colors.grayf0};
  border-radius: 4px;
`
export const UploadWarning = styled.span`
  background-color: ${colors.green.medium};
  border-radius: 4px;
  border: 2px dashed ${colors.green.border};
  box-sizing: border-box;
  position: absolute;
  font-size: 20px;
  top: 0;
  left: 0;
  padding: 10px;
  min-width: 100%;
  min-height: 100%;
  color: white;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    margin: 0;
    padding: 0;
  }
`
