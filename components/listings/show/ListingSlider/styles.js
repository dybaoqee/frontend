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
import {Content} from 'components/listings/show/Popup/styles'
import {listingDetailsMaxWidth} from 'constants/dimensions'
import {zIndexModal} from 'constants/zIndex'
import Text from '@emcasa/ui-dom/components/Text'

export const SPINNER_SIZE = 40
export const LISTINGSLIDER_HEIGHT = 454
export const LISTINGSLIDER_OFFSET = (desktopHeaderHeight + listingDetailsBarHeight)

export default styled.div`
  z-index: ${({isFullScreen}) => isFullScreen ? zIndexModal : null};
  position: ${({isFullScreen}) => isFullScreen ? 'fixed' : 'relative'};
  top: ${({isFullScreen}) => isFullScreen ? '0' : null};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({isFullScreen}) => isFullScreen ? '100%' : `calc(62vh - ${LISTINGSLIDER_OFFSET}px)`};
  max-width: 100%;
  min-height: ${({isFullScreen}) => isFullScreen ? null : `${LISTINGSLIDER_HEIGHT / 2}px`};
  overflow: hidden;
  box-sizing: border-box;

  @media screen and ${breakpoint.up('desktop')} {
    height: ${({isFullScreen}) => isFullScreen ? null : '45vh'};
    max-height: ${({isFullScreen}) => isFullScreen ? null : '540px'};
    min-height: ${({isFullScreen}) => isFullScreen ? null : '300px'};
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
    z-index: 2;
    position: relative;
    width: 100%;
    height: 100%;
    background: ${theme.colors.white};

    @media screen and ${breakpoint.up('desktop')} {
      max-width: ${({isFullScreen}) => isFullScreen ? `${listingDetailsMaxWidth}px` : null};
      max-height: ${({isFullScreen}) => isFullScreen ? '65vh' : null};
      padding: ${({isFullScreen}) => isFullScreen ? `${theme.space[4]}px` : null};
      width: ${({isFullScreen}) => isFullScreen ? `calc(100% - ${theme.space[4]}px)` : null};
      box-sizing: ${({isFullScreen}) => isFullScreen ? 'border-box' : null};
    }
  }

  .slider-image {
    z-index: 2;
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-sizing: border-box;
  }

  .slick-dots {
    bottom: 0;
    background-color: rgba(0, 0, 0, .3);

    li.slick-active button:before {
      color: ${theme.colors.pink};
    }

    li button:before {
      color: ${theme.colors.white};
      opacity: .8;
    }
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

export const CarouselItem = styled.div`
  height: 100%;
  cursor: ${({isFullScreen}) => isFullScreen ? null : 'pointer'};
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
  ${({left}) => (!left ? `right: ${theme.space[4]}px` : `left: ${theme.space[4]}px`)};
  color: white;
  cursor: pointer;
  padding: 0;
  background: 0;
  border: 0;
  cursor: ${({disabled}) => disabled ? 'default' : null};
  opacity: ${({disabled}) => disabled ? '0.5' : null};

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
export const OpenMatterportButtonWrapper = styled.div`
  z-index: 5;
  position: absolute;
  top: ${theme.space[2]}px;
  left: 50%;
  transform: translateX(-50%);

  @media screen and ${breakpoint.up('desktop')} {
    position: relative;
    left: initial;
    transform: initial;
    margin: 0 0 ${theme.space[4]}px;
  }

  ${Button} {
    svg {
      margin-right: ${theme.space[2]}px;
      display: inline-block;
      width: 1em;
      height: 1em;
      overflow: visible;
      vertical-align: -0.125em;
      font-size: inherit;
    }
  }
`

export const PaginationTextWrapper = styled.div`
  display: ${({isFullScreen}) => isFullScreen ? null : 'none'};
  z-index: 5;
  position: absolute;
  bottom: ${theme.space[2]}px;
  left: 50%;
  transform: translateX(-50%);

  @media screen and ${breakpoint.up('desktop')} {
    position: relative;
    left: initial;
    transform: initial;
    margin: ${theme.space[4]}px 0 0;
  }
`

export const PaginationText = styled(Text)`
  color: ${theme.colors.white};
  margin: 0;
  text-shadow: 1px 1px 2px ${theme.colors.dark};

  @media screen and ${breakpoint.up('desktop')} {
    color: ${theme.colors.dark};
    text-shadow: initial;
  }
`