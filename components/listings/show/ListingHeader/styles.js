import * as colors from 'constants/colors'
import styled from 'styled-components'
import {mobileMedia} from 'constants/media'
import theme from '@emcasa/ui'
import Button from '@emcasa/ui-dom/components/Button'
import Icon from '@emcasa/ui-dom/components/Icon'

export const Thumb = styled.div`
  box-sizing: border-box;
  padding: 10px;
  max-height: 100%;
  height: 70px;
  background: ${colors.blue.darker};
  font-size: 12px;
  color: white;
  text-transform: uppercase;
  background-image: url(${({background}) => background});
  font-weight: 600;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  cursor: pointer;
  outline: none;

  display: flex !important;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  svg {
    width: 20px !important;
    height: 20px;
  }
  span {
    margin-top: 5px;
    text-align: center;
  }

  border-right: 2px solid ${colors.gray4a};

  opacity: ${({alwaysVisible}) => (alwaysVisible ? 1 : 1)};
  filter: grayscale(${({alwaysVisible}) => (alwaysVisible ? 0 : 100)}%);
  transition: all 0.5s;

  :hover {
    opacity: 1;
    filter: grayscale(0%);

    box-shadow: 2px 2px 27px 9px rgba(0, 0, 0, 0.61);
  }
`

export const SliderImage = styled.img`
  box-sizing: border-box;
  cursor: pointer;
  max-height: 343px;
  height: 343px;
  z-index: 2;
  position: relative;
  object-fit: cover;
  width: 100%;
`

export const Content = styled.div`
  max-height: 343px;
  min-height: 343px;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
  position: relative;
  background: ${colors.lightestGray};

  .spinner {
    content: '';
    width: 30px;
    height: 30px;
    border: 6px solid ${colors.blue.medium};
    border-left-color: ${colors.blue.light};
    border-radius: 50%;
    z-index: 1;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
    position: absolute;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export const Arrow = styled.div`
  color: white;
  cursor: pointer;
  position: absolute;
  top: calc(50% - 20px);
  ${({left}) => (!left ? 'right: 20px' : 'left: 20px')};
  z-index: 3;
  filter: drop-shadow(1px 1px 4px ${colors.text});
  svg {
    width: 40px !important;
    height: 40px;
  }
`

export const TourWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;

  iframe {
    z-index: 2;
    box-sizing: border-box;
    width: 100%;
    height: ${({isFullScreen}) =>
      isFullScreen ? 'calc(100% - 70px)' : '343px'};
  }

  .overlay {
    width: 100%;
    height: 100%;
    background: blue;
    position: absolute;
    top: 0;
    z-index: 2;
    opacity: 0;
  }
`

export const SliderNavigation = styled.div`
  box-sizing: border-box;
  height: 70px;
  display: ${({show}) => (show ? 'flex' : 'none')};

  * {
    min-height: 0;
    min-width: 0;
  }

  .container {
    flex-grow: 1;
  }
  .slick-list {
    box-sizing: border-box;
  }

  .slick-slide {
    box-sizing: border-box;
  }

  .slick-current {
    border: 2px solid ${colors.gray4a};
    opacity: 1;
    filter: grayscale(0%);

    * {
      opacity: 1;
      filter: grayscale(0%);
    }

    box-shadow: 2px 2px 20px 5px rgba(0, 0, 0, 0.61);
  }

  @media ${mobileMedia} {
    ${Arrow} {
      top: calc(50% - 10px);
      svg {
        width: 20px !important;
        height: 20px;
      }
    }
  }
`

export const BottomRight = styled.div`
  bottom: 20px;
  right: 20px;
  button {
    margin-left: 10px;
  }
`

export const NavigationButton = styled.div`
  box-sizing: border-box;
  max-height: 70px;
  background: white;
  min-width: 80px;
  color: ${colors.blue.dark};
  cursor: pointer;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-right: 1px solid ${colors.lightestGray};

  svg {
    width: 20px !important;
    height: 20px;
  }
  span {
    margin-top: 5px;
    text-align: center;
  }
`

export default styled.div`
  position: relative;
  width: 100vw;
  max-width: 100vw;
  background-color: ${({isFullScreen}) =>
    isFullScreen ? 'rgba(0, 0, 0, 0.9)' : 'white'};

  box-sizing: border-box;

  min-height: 150px;

  ${BottomRight}, .top-right {
    position: absolute;
  }

  & div.top-right {
    justify-content: space-between;
    top: 20px;
    right: 20px;
    display: flex;
    button {
      margin-left: 10px;
    }
  }

  .images-slider {
    ${({isFullScreen}) => isFullScreen && 'height: calc(100% - 70px);'};
  }

  @@media ${mobileMedia} {
    .images-slider {
      ${({isFullScreen}) => isFullScreen && 'height: calc(100% - 95px);'};
    }
  }
  .slick-list,
  .slick-track {
    height: 100%;
    min-height: 100%;
  }

  .slick-slide > div {
    height: inherit;
  }
  ${SliderImage} {
    ${({isFullScreen}) =>
      isFullScreen &&
      'min-height: 100%; max-height: 100%; height: 100%; flex-grow: 1; background-size: contain; '};
  }

  ${Content} {
    ${({isFullScreen}) =>
      isFullScreen &&
      `min-height: 100%;
       max-height: 100%;
        height: calc(100vh - 70px);
        background: none;
        display: flex !important;
         iframe {

        height: inherit;
      }`};
  }

  ${({isFullScreen}) =>
    isFullScreen && 'position: fixed; top: 0; z-index: 9999; height: 100%; '};
`

export const CloseButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  border: none;
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
`

export const CloseIcon = styled(Icon)`
  padding-top: 6px;
`
