import styled from 'styled-components'
import theme from 'config/theme'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Row from '@emcasa/ui-dom/components/Row'
import {zIndexModal} from 'constants/zIndex'
import {listingDetailsMaxWidth} from 'constants/dimensions'

export default styled.div`
  z-index: ${zIndexModal + 5};
  position: fixed;
  top: 0;
  left: 0;
  display: ${props => props.open ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const Wrapper = styled.div`
  z-index: 2;
  position: relative;
  width: 100%;
  height: 100%;

  @media screen and ${breakpoint.up('desktop')} {
    max-width: ${listingDetailsMaxWidth}px;
    max-height: 65vh;
  }
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  background: ${theme.colors.white};

  @media screen and ${breakpoint.up('desktop')} {
    width: calc(100% - ${theme.space[4]}px);
    padding: ${theme.space[4]}px;
    margin: 0 auto;
    box-sizing: border-box;
  }
`

export const Background = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${theme.colors.white};

  @media screen and ${breakpoint.up('desktop')} {
    opacity: .8;
  }
`