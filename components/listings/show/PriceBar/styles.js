import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import {
  desktopHeaderHeight,
  listingDetailsBarHeight
} from 'constants/dimensions'

export const Wrapper = styled(Row)`
  align-items: center;
  justify-content: center;
  padding: ${themeGet('space.4')}px ${themeGet('space.4')}px;
  border-top: 1px solid ${themeGet('colors.lightGrey')};
  border-bottom: 1px solid ${themeGet('colors.lightGrey')};
  box-sizing: border-box;

  @media screen and ${breakpoint.up('desktop')} {
    z-index: 6;
    position: fixed;
    left: 0;
    top: ${desktopHeaderHeight}px;
    width: 100%;
    height: ${listingDetailsBarHeight}px;
    padding: 0 ${themeGet('space.4')}px;
    background: ${themeGet('colors.white')};
  }

  ${Text} {
    display: flex;
    justify-content: space-between;
    margin: 0;

    @media screen and ${breakpoint.up('desktop')} {
      justify-content: flex-start;
      white-space: nowrap;
    }

    span {
      margin-left: ${themeGet('space.1')}px;
    }
  }
`

export const Container = styled('div')`
  width: 100%;
`
