import styled from 'styled-components'
import {mobileMedia, headerMobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default styled.div`
  position: relative;
  cursor: pointer;

  ${({resumedInfo}) =>
    resumedInfo &&
    `
    @media ${mobileMedia} {
      min-height: 100%;
    }
  `};
`

export const ListingActions = styled.div`
  width: auto;
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  box-sizing: border-box;

  @media ${headerMobileMedia} {
    right: 10px;
  }

  @media ${mobileMedia} {
    max-width: 55%;

    button {
      font-size: 12px;
    }
  }

  ${({resumedInfo}) =>
    resumedInfo &&
    `
    @media ${mobileMedia} {
      display: none;
    }
  `};
`

export const ListingInfo = styled.div`
  font-size: 22px;
  font-weight: 400;
  display: block;
  margin: 0 10px 10px 0;

  grid-column: span 3;
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 20px 20px 24px 0;

  @media ${headerMobileMedia} {
    padding: 10px 10px 10px 0;
    margin: 0;
  }

  @media ${mobileMedia} {
    padding: 10px 10px 24px 0;
    align-items: center;
  }

  span {
    position: absolute;
    top: 230px;
    left: 10px;
    :before {
      content: 'R$';
      font-size: 14px;
    }

    @media ${headerMobileMedia} {
      position: relative;
      top: 0;
    }

    @media ${mobileMedia} {
      left: 0;
    }
  }

  ${({resumedInfo}) =>
    resumedInfo &&
    `
    @media ${mobileMedia} {
      display: none;
    }
  `};
`

export const ListingContainer = styled.div`
  box-sizing: border-box;
  background: ${({highlight}) => (highlight ? '#f5f5f5' : 'white')};
  border-bottom: 1px solid ${colors.lightGray};

  overflow: hidden;
  padding: 20px 0 10px 10px;
  position: relative;
  display: grid;
  grid-template-columns: 290px 1fr;

  :hover {
    background: #f5f5f5;
    cursor: pointer;

    .listing-table:after {
      background: #f5f5f5;
    }
  }

  @media ${headerMobileMedia} {
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
    padding-right: 10px;
    > :first-child {
      grid-column: span 3;
    }
  }

  @media ${mobileMedia} {
    display: flex;
    flex-direction: column;
    padding: 20px 10px 0;
  }

  ${({resumedInfo}) =>
    resumedInfo &&
    `
    @media ${mobileMedia} {

      width: 65vw;
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

      .listing-info{
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

  > div {
    width: 55px;
    border-radius: 8px;
    padding: 15px 17px;
    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }

  @media ${mobileMedia} {
    justify-content: flex-start;
  }
`

export const ListingInfoMobile = styled.div`
  display: none;
  width: 100%;

  span {
    margin: 0;
    padding: 0;
    font-size: 2.8vh;
    font-weight: 300;
  }

  span.address {
    margin: 3px 0 0;
    padding: 0;
    font-weight: 400;
    white-space: nowrap;
    width: 98%;
    overflow-x: hidden;
    font-size: 1.8vh;
  }

  ${({resumedInfo}) =>
    resumedInfo &&
    `
    @media ${mobileMedia} {
      height: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
  `};
`

export const ImageContainer = styled.div`
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
  border-radius: 4px;
  height: 200px;
  position: relative;
  width: 100%;

  > * {
    display: none !important;
  }

  @media ${mobileMedia} {
    margin-top: 0;
  }

  ${({resumedInfo}) =>
    resumedInfo &&
    `
    @media ${mobileMedia} {
      width: 100%;
      height: 70%;
      margin: 0;
      > * {
        display: block !important;
      }
    }
  `};
`
