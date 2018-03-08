import styled from 'styled-components'

import * as colors from 'constants/colors'

export default styled.div`
  clear: both;
  > div {
    border-color: ${colors.lightestGray} !important;
    cursor: pointer;
    align-items: center;
    display: flex;
    margin-bottom: 20px;
    justify-content: center;
    position: relative;
    height: 300px !important;
    width: calc(100% - 4px) !important;
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
`

export const Tile = styled.div`
  background: ${colors.grayf0};
  border-radius: 4px;
`
