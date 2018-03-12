import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  justify-items: center;
  grid-gap: 20px;

  @media ${mobileMedia} {
    display: block;

    > div {
      margin-bottom: 20px;
    }
  }

  > div:first-child {
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
