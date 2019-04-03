import styled from 'styled-components'
import theme from 'config/theme'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'
import {
  desktopHeaderHeight,
  listingDetailsMaxWidth,
  listingDetailsBarHeight,
  listingDetailsBarHeightDesktop
} from 'constants/dimensions'

export const Wrapper = styled(Row)`
  position: fixed;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 ${theme.space[4]}px;
  box-sizing: border-box;
  background: ${theme.colors.white};
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.5);

  @media screen and ${breakpoint.up('desktop')} {
    bottom: initial;
    top: ${desktopHeaderHeight}px;
    height: ${listingDetailsBarHeightDesktop}px;
    padding: 0 ${theme.space[4]}px;
    background: none;
    box-shadow: none;
  }
`

export const Container = styled(Row)`
  justify-content: space-between;
  width: 100%;
  max-width: ${listingDetailsMaxWidth}px;
  margin: ${theme.space[4]}px 0;

  @media screen and ${breakpoint.up('desktop')} {
    justify-content: flex-end;
    margin: 0;
  }
`
