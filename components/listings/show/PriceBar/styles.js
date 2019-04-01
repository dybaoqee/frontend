import styled from 'styled-components'
import theme from 'config/theme'
import { breakpoint} from '@emcasa/ui/lib/styles'
import Row from '@emcasa/ui-dom/components/Row'
import { LISTING_DETAILS_MAX_WIDTH } from 'components/listings/show/Body/styles'
import { desktopHeaderHeight } from 'constants/dimensions'

export const Wrapper = styled(Row)`
  justify-content: center;
  padding: 0 ${theme.space[4]}px;
  margin-bottom: ${theme.space[5]}px;
  border-top: 1px solid ${theme.colors.lightGrey};
  border-bottom: 1px solid ${theme.colors.lightGrey};

  @media screen and ${breakpoint.up('desktop')} {
    position: fixed;
    left: 0;
    top: ${desktopHeaderHeight}px;
    width: 100%;
    margin-bottom: 0;
    background: ${theme.colors.white};
  }
`

export const Container = styled('div')`
  width: 100%;
  max-width: ${LISTING_DETAILS_MAX_WIDTH}px;
`
