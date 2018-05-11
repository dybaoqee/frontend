import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import {desktopFilterHeight} from 'constants/dimensions'

export default styled.div`
  margin-top: ${desktopFilterHeight}px;
  overflow: auto;
  .entries-container {
    box-sizing: border-box;
    position: relative;
    width: 60%;
    float: right;
  }

  .gm-style-pbc {
    z-index: 5 !important;
    pointer-events: none;
  }
  .map {
    box-sizing: border-box;
    background: white;
    border-radius: 4px;
    height: calc(100vh - 178px);
    overflow: hidden;
    position: fixed !important;
    width: calc(40% - 40px) !important;
    margin: 20px 0 0 20px;
  }

  @media ${mobileMedia} {
    .entries-container {
      width: 100%;
    }

    .map {
      box-sizing: border-box;
      width: 100% !important;
      border-radius: 0;
      margin: 0;
      left: ${({opened}) => (opened ? 0 : '100%')};
      height: 70%;
    }
  }

  ${({opened}) =>
    opened &&
    `
    @media ${mobileMedia} {
        position: fixed;
        margin: 0;
        top: 0;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        z-index: 9998;

        body {
          overflow: hidden;
        }

      .entries-container {
        position: absolute;
        height: 30%;
        top: 70%;
        width: auto;
      }
    }
  `};
`

export const MapButton = styled.div`
  position: fixed;
  z-index: 9999;
  cursor: pointer;
  display: none;
  transition: bottom 0.3s;

  background-image: url(${({opened}) =>
    opened ? '/static/img/list_button.png' : '/static/img/map_button.png'});
  background-size: cover;
  right: 0;
  bottom: ${({opened}) => (opened ? '32%' : 0)};
  width: 80px;
  height: 80px;

  @media ${mobileMedia} {
    display: block;
  }
`
