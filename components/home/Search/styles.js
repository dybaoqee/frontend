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
  flex-direction: column;
  margin: 60px auto 0;
  width: 600px;
  > div {
    align-items: center;
    display: flex;
    height: 44px;
    &:first-of-type {
      border-bottom: 1px solid ${colors.lightestGray};
    }
    > div {
      height: 44px;
      padding: 0;
      &:last-child {
        border-right: none;
      }
    }
  }

  @media ${mobileMedia} {
    background: transparent;
    border: none;
    margin-top: 20px;
    width: calc(100vw - 40px);
    > div {
      flex-direction: column;
      height: auto;
      &:first-of-type {
        border-bottom: none;
      }
      > div {
        border-right: none;
        background: white;
        margin-bottom: 20px;
      }
    }
  }
`

export const Neighborhoods = styled.div`
  width: calc(50% - 20px);
`
