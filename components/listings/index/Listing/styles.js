import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.div`
  box-sizing: border-box;
  background: ${({highlight}) => (highlight ? '#f5f5f5' : 'white')};
  border-bottom: 1px solid ${colors.lightGray};
  cursor: pointer;
  overflow: hidden;
  padding-bottom: 20px;
  padding-top: 20px;
  position: relative;
  width: 100%;

  :hover {
    background: #f5f5f5;
    cursor: pointer;
  }

  span.matterport {
    background: rgba(240, 50, 50, 1);
    color: white;
    font-size: 9px;
    font-stretch: condensed;
    font-weight: bold;
    padding: 4px 30px;
    position: absolute;
    right: -35px;
    top: 24px;
    text-transform: uppercase;
    transform: rotate(45deg);
  }

  ${({mapOpenedOnMobile}) =>
    mapOpenedOnMobile &&
    `
    @media ${mobileMedia} {
      width: 85vw;
      padding: 0;
      height: 100%;
      border: 0;
      padding: 10px 5px 3px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &:first-of-type {
        padding-left: 10px;
      }

      &:last-of-type {
        padding-right: 10px;
      }

      span.matterport {
        display: none;
      }
    }
  `};
`

export const LikeContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;

  button {
    border-radius: 8px;
    padding: 15px 17px;
    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }

  @media ${mobileMedia} {
    justify-content: flex-start;
  }

  ${({mapOpenedOnMobile}) =>
    mapOpenedOnMobile &&
    `
    @media ${mobileMedia} {
      justify-content: flex-end;
    }
  `};
`

export const ListingInfo = styled.div`
  bottom: 10px;
  color: white;
  left: 10px;
  position: absolute;

  span {
    clear: both;
    display: block;
    font-size: 18px;
  }

  span.address {
    font-size: 13px;
    margin-bottom: 1px;
    margin-top: 3px;
  }

  span.neighborhood {
    font-size: 10px;
  }

  ${({mapOpenedOnMobile}) =>
    mapOpenedOnMobile &&
    `
    @media ${mobileMedia} {
      display: none;
    }
  `};
`

export const ListingInfoMobile = styled.div`
  display: none;
  width: 100%;
  span {
    display: block;
    font-size: 18px;
    font-weight: 300;
  }

  span.address {
    font-size: 13px;
    margin: 3px 0 0;
    padding: 0;
    font-weight: 400;
  }

  ${({mapOpenedOnMobile}) =>
    mapOpenedOnMobile &&
    `
    @media ${mobileMedia} {

      display: flex;
      flex-direction: column;
    }
  `};
`

export const ImageContainer = styled.div`
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  float: left;
  height: 200px;
  margin-left: 10px;
  position: relative;
  width: 290px;
  margin-top: 4px;

  @media ${mobileMedia} {
    width: calc(100% - 20px);
    margin-top: 0;
  }

  ${({mapOpenedOnMobile}) =>
    mapOpenedOnMobile &&
    `
    @media ${mobileMedia} {
      width: 100%;
      height: auto;
      flex: 1;
      margin: 0;
    }
  `};
`
