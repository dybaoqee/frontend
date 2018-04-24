import styled from 'styled-components'
import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import {desktopFilterHeight} from 'constants/dimensions'

export default styled.div`
  position: relative;
  margin-top: ${desktopFilterHeight}px;
  .entries-container {
    width: 60%;
    float: right;
  }

  .gm-style-pbc {
    z-index: 5 !important;
    pointer-events: none;
  }

  .map {
    background: white;
    border-radius: 8px;
    height: calc(100vh - 178px);
    margin-left: 20px;
    overflow: hidden;
    position: fixed !important;
    width: calc(40% - 40px) !important;
    margin-top: 24px;
    transition: all 0.5s;
  }

  @media ${mobileMedia} {
    .entries-container {
      width: 100%;
    }

    .map {
      width: 100% !important;
      border-radius: 0;
      margin: 0;
      height: calc(100vh - 133px);
      z-index: 1;
      right: ${({opened}) => (opened ? 0 : '100%')};
      opacity: ${({opened}) => (opened ? 1 : 0)};
    }
  }
`

export const MapButton = styled.div`
  position: fixed;
  z-index: 2;
  cursor: pointer;
  display: none;
  transition: all 0.3s;
  ${({opened}) =>
    !opened
      ? `background-image: url("/static/img/map_button.png");
    background-size: cover;
    right: 0;
    bottom: 0;
    width: 80px;
    height: 80px;
    `
      : `height: 46px;
      box-shadow: 0 6px 16px 0 rgba(38, 38, 38, 0.4);
      background: white;
      width: 94%;
      bottom: 2%;
      left: 3%;
      margin-right: 10px;
      color: ${colors.blue.medium};

      :before{
        content: "Ver listagem de imóveis";
        position: relative;
        top: 25%;
        left: 4%;
      }

      :after{
        content: "›";
        position: absolute;
        font-size: 30px;
        line-height: 42px;
        right: 4%;
        height: 100%;
        top: 0;
      }
      `};

  @media ${mobileMedia} {
    display: block;
  }
`
