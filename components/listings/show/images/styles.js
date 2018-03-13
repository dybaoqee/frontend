import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  justify-items: center;
  grid-gap: 20px;

  @media ${mobileMedia} {
    display: block;

    > div {
      margin-bottom: 10px;
    }
  }

  > :first-child {
    grid-row: 2 / 2;
  }

  > div:nth-child(2) {
    grid-column: span 2;
    justify-self: stretch;
    height: 227px;
    position: relative;

    :after {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      width: 120px;
      border-radius: 0 4px 0 4px;
      background-color: ${colors.lightBlue};
      color: ${colors.blue};
      content: 'FOTO DE CAPA';
      font-size: 12px;
      font-weight: bold;
      line-height: 17px;
      text-align: center;
      top: 0;
      right: 0;
      z-index: 2;
    }

    > div {
      min-height: 100%;
    }
  }
`

export const ImagePlaceholder = styled.div`
  color: ${colors.mediumGray};
  box-sizing: border-box;
  min-height: 100%;
  min-width: 100%;
  height: 190px;
  border: 2px dashed ${colors.lightGray};
  border-radius: 4px;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-content: center;

  > p {
    font-weight: normal;
    font-size: 18px;
    align-self: end;
    padding: 0;
    margin: 0;
  }

  > p:last-child {
    align-self: start;
  }
`
