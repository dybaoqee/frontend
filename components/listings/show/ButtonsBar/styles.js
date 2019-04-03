import styled from 'styled-components'
import theme from 'config/theme'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Row from '@emcasa/ui-dom/components/Row'
import { desktopHeaderHeight, LISTING_DETAILS_MAX_WIDTH } from 'constants/dimensions'

export const Wrapper = styled(Row)`
  position: fixed;
  right: 0;
  bottom: 0;
  justify-content: center;
  width: 100%;
  padding: 0 ${theme.space[4]}px;
  background: ${theme.colors.white};
  box-sizing: border-box;

  @media screen and ${breakpoint.up('desktop')} {
    bottom: initial;
    top: ${desktopHeaderHeight}px;
    width: auto;
  }
`

export const Container = styled(Row)`
  width: 100%;
  max-width: ${LISTING_DETAILS_MAX_WIDTH}px;
`
