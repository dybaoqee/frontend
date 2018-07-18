import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 200px;
    min-width: 200px;
    height: 180px;
    box-sizing: border-box;
    margin: 5px;
    position: relative;
    flex-grow: 1;
    max-width: 435px;
  }

  > div:nth-child(1) {
    :after {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      width: 120px;
      border-radius: 0 4px 0 4px;
      background-color: ${colors.blue.light};
      color: ${colors.blue.medium};
      content: 'FOTO PRINCIPAL';
      font-size: 12px;
      font-weight: 700;
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
  color: ${colors.mediumDarkGray};
  box-sizing: border-box;
  border: 2px dashed ${colors.lightGray};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;

  > span {
    font-weight: 200;
    font-size: 60px;
    line-height: 40px;
  }

  > p {
    font-weight: normal;
    font-size: 18px;
    padding: 0;
    margin: 0;
  }
`

export const Container = styled.div`
  margin: 0 auto;
  padding: 40px;
  max-width: 1200px;
  width: auto;
  box-sizing: border-box;
  min-width: 90%;

  @media ${mobileMedia} {
    padding: 20px;
    min-width: 100%;
  }
`
