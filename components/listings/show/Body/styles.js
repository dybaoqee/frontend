import styled from 'styled-components'
import {themeGet} from 'styled-system'
import Row from '@emcasa/ui-dom/components/Row'
import {breakpoint} from '@emcasa/ui/lib/styles'
import {listingDetailsMaxWidth} from 'constants/dimensions'

export const Container = styled(Row)`
  width: 100%;
  max-width: ${listingDetailsMaxWidth}px;
  margin: auto;
  flex-direction: column;
  padding: 0 ${themeGet('space.4')}px;
  margin-bottom: ${themeGet('space.4')}px;
  box-sizing: border-box;

  @media screen and ${breakpoint.up('desktop')} {
    flex-direction: row;
  }
`

export const DevelopmentContainer = styled(Row)`
  background-color: ${themeGet('colors.snow')};
  border-top: 1px solid ${themeGet('colors.darkSmoke')};
  border-bottom: 1px solid ${themeGet('colors.darkSmoke')};
  & > div {
    width: 100%;
    max-width: ${listingDetailsMaxWidth}px;
    margin: auto;
    padding: ${themeGet('space.4')}px;
  }
  .listingsFeed {
    margin-left: -${themeGet('space.4')}px;
    margin-right: -${themeGet('space.4')}px;
    & > div {
      margin: 0;
    }
  }
`
