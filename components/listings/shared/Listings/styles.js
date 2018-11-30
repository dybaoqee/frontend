import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import {desktopFilterHeight} from 'constants/dimensions'

export const ListingsContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 60%;
  float: right;

  @media ${mobileMedia} {
    width: 100%;
  }

  ${({opened}) =>
    opened &&
    `
    @media ${mobileMedia} {
      position: absolute;
      width: auto;
      height: 100%;
    }
  `};
`

export const MapContainer = styled.div`
box-sizing: border-box;
background: white;
border-radius: 4px;
height: calc(100vh - 178px);
overflow: hidden;
position: fixed !important;
width: calc(40% - 40px); !important;
margin: 20px 0 0 20px;

  @media ${mobileMedia} {
    box-sizing: border-box;
    width: 100% !important;
    border-radius: 0;
    margin: 0;
    top: 0;
    left: 0;
    z-index: 9901;
    left: ${({opened}) => (opened ? 0 : '100%')};
    height: 70%;
    position: absolute;
  }
`

export default styled.div`
  box-sizing: border-box;

  .gm-style-pbc {
    z-index: 5 !important;
    pointer-events: none;
  }

  ${({opened}) =>
    opened &&
    `
    @media ${mobileMedia} {
      overflow-x: auto;
      position: fixed;
      margin: 0;
      bottom: 0;
      height: 30%;
      z-index: 9900;
      min-width: 100%;


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

export const Loading = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
