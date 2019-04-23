import styled from 'styled-components'
import theme from 'config/theme'
import {
  desktopHeaderHeight,
  listingDetailsBarHeight
} from 'constants/dimensions'
import {mobileMedia} from 'constants/media'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Button from '@emcasa/ui-dom/components/Button'
import MoonLoader from 'react-spinners/MoonLoader'

export const SPINNER_SIZE = 40
export const LISTINGSLIDER_HEIGHT = 454
export const LISTINGSLIDER_OFFSET = (desktopHeaderHeight + listingDetailsBarHeight)
export const LISTINGSLIDER_NAVIGATION_HEIGHT = 70

export default styled.div`
  z-index: ${({isFullScreen}) => isFullScreen ? '9999' : null};
  position: ${({isFullScreen}) => isFullScreen ? 'fixed' : 'relative'};
  top: ${({isFullScreen}) => isFullScreen ? '0' : null};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({isFullScreen}) => isFullScreen ? '100%' : `calc(62vh - ${LISTINGSLIDER_OFFSET}px)`};
  max-width: 100%;
  min-height: ${({isFullScreen}) => isFullScreen ? null : `${LISTINGSLIDER_HEIGHT / 2}px`};
  overflow: hidden;
  background-color: ${({isFullScreen}) => isFullScreen ? theme.colors.dark : theme.colors.white};
  box-sizing: border-box;

  @media screen and ${breakpoint.up('desktop')} {
    height: ${({isFullScreen}) => isFullScreen ? null : `${LISTINGSLIDER_HEIGHT}px`};
  }

  > ${Button} {
    z-index: 5;
    position: absolute;
    top: ${theme.space[2]}px;
    right: ${theme.space[2]}px;
  }

  .slick-list,
  .slick-track,
  .slick-slide > div {
    height: 100%;
  }

  .images-slider {
    overflow: hidden;
    ${({isFullScreen}) => isFullScreen ? 'flex: 1 1 100%;' : 'height: 100%;'};
  }

  .slider-image {
    z-index: 2;
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    object-fit: cover;
    box-sizing: border-box;
  }
`

export const SpinnerWrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`

export const Spinner = styled(MoonLoader).attrs(({theme}) => {
  return {
    color: theme.colors.pink,
    size: SPINNER_SIZE
  }
})``

export const Thumb = styled.div`
  box-sizing: border-box;
  max-height: 100%;
  height: ${LISTINGSLIDER_NAVIGATION_HEIGHT}px;
  background: ${theme.colors.dark};
  background-image: url(${({background}) => background});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  cursor: pointer;
  outline: none;

  opacity: ${({alwaysVisible}) => (alwaysVisible ? 1 : 1)};
  filter: grayscale(${({alwaysVisible}) => (alwaysVisible ? 0 : 100)}%);
  transition: all 0.5s;

  :hover {
    opacity: 1;
    filter: grayscale(0%);

    box-shadow: 2px 2px 27px 9px rgba(0, 0, 0, 0.61);
  }
`

export const CarouselItem = styled.div`
  height: 100%;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
  position: relative;
  background: ${theme.colors.smoke};

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export const Arrow = styled(Button)`
  z-index: 3;
  position: absolute;
  top: calc(50% - ${theme.space[2]}px);
  ${({left}) => (!left ? `right: 0` : `left: 0`)};
  color: white;
  cursor: pointer;
  padding: 0;
  background: 0;
  border: 0;

  &:hover {
    svg {
      background: 0;
    }
  }

  svg {
    width: 40px !important;
    height: 40px;
    filter: drop-shadow(1px 1px 4px ${theme.colors.dark});
  }
`

export const SliderNavigation = styled.div`
  flex: 0 0 ${LISTINGSLIDER_NAVIGATION_HEIGHT}px;
  height: ${LISTINGSLIDER_NAVIGATION_HEIGHT}px;
  box-sizing: border-box;
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
    border: 2px solid ${theme.colors.pink};
    opacity: 1;
    filter: grayscale(0%);

    * {
      opacity: 1;
      filter: grayscale(0%);
    }

    box-shadow: 2px 2px 20px 5px rgba(0, 0, 0, 0.61);
  }

  ${Arrow} {
    display: none;
  }
`
