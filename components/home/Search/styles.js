import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import styled from 'styled-components'
import {imageUrl} from 'utils/image_url'

export default styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)),
    url(${imageUrl('emcasa-home-2018-01-30_zmkjyy.jpg')});
  background-position: center;
  background-size: cover;
  height: 400px;
  padding-top: 20px;

  > h1 {
    color: white;
    font-weight: 300;
    margin-top: 80px;
    text-align: center;
    text-shadow: 0px 1px rgba(0, 0, 0, 0.4), 0px -1px rgba(0, 0, 0, 0.2);
  }

  @media ${mobileMedia} {
    max-width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    height: auto;
    padding-bottom: 40px;
    width: 100vw;
    > h1 {
      font-weight: 400;
      margin-top: 20px;
      max-width: calc(100vw - 60px);
    }
  }
`

export const Search = styled.div`
  background: white;
  border: 1px solid ${colors.lightestGray};
  border-radius: 10px;
  display: flex;

  margin: 60px auto 0;
  width: 600px;
  > div {
    align-items: center;
    height: 44px;
  }

  & .Select-control {
    background: transparent;
    border: none;
    height: 45px;

    .Select-placeholder {
      align-items: center;
      display: flex;
    }
    .Select-value {
      align-items: center;
      border-radius: 9px;
      display: flex;
    }
    .Select-input {
      padding-top: 7px;
    }
  }

  @media ${mobileMedia} {
    background: transparent;
    border: none;
    flex-direction: column;
    margin-top: 20px;
    width: calc(100vw - 40px);
    > div {
      flex-direction: column;
      &:first-of-type {
        border-bottom: none;
      }
      > div {
        border-radius: 9px;
        border-right: none;
        background: white;
        margin-bottom: 20px;
      }
    }
  }
`

export const Neighborhoods = styled.div`
  width: calc(100% - 60px);
  @media ${mobileMedia} {
    border-radius: 8px;
    width: 100%;
  }
`

export const Magnifier = styled.div`
  align-items: center;
  background: ${colors.blue.medium};
  border-bottom-right-radius: 9px;
  border-top-right-radius: 9px;
  cursor: pointer;
  display: flex;
  height: 44px;
  justify-content: center;
  width: 60px;
  &:hover {
    background: ${colors.blue.dark};
  }
  svg {
    height: 20px;
    width: 40px;
  }
  svg path {
    fill: white;
  }

  @media ${mobileMedia} {
    display: none;
  }
`

export const MobileMagnifier = styled.div`
  display: none;

  @media ${mobileMedia} {
    align-items: center;
    background: ${colors.blue.medium};
    border-radius: 8px;
    margin-top: 10px;
    width: 100%;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    &:hover {
      background: ${colors.blue.dark};
    }
  }
`
