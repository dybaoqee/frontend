import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'
import {desktopHeaderAndFilterHeight} from 'constants/dimensions'

export default styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;

  ${({mapOpenedOnMobile}) =>
    mapOpenedOnMobile &&
    `
      @media ${mobileMedia} {
        flex-direction: row;
        overflow-y: hidden;
        height: 100%;
        max-height: 100%;
      }
    `};
`

export const Footer = styled.footer`
  width: 100%;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  font-size: 0.7em;
  background-color: ${colors.offWhite};
  a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    color: inherit;
    text-decoration: none;
  }
`

export const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;

  ${({title}) =>
    title &&
    `
      > :nth-child(2) {
      padding-top: 44px;
    }`};

  @media ${mobileMedia} {
    height: calc(100vh - ${desktopHeaderAndFilterHeight}px);
  }

  ${({mapOpenedOnMobile}) =>
    mapOpenedOnMobile &&
    `
    @media ${mobileMedia} {
      height: 100%;
    }
  `};
`

export const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  font-size: 16px;
  position: fixed;
  background: white;
  width: 100%;
  z-index: 1;
  box-shadow: inset 0 -1px 0 0 ${colors.lightGray};
  padding: 10px;
`
