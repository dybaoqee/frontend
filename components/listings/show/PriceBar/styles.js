import styled from 'styled-components'
import theme from 'config/theme'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Row from '@emcasa/ui-dom/components/Row'
import { LISTING_DETAILS_MAX_WIDTH } from 'components/listings/show/Body/styles'

export const Wrapper = styled(Row)`
  justify-content: center;
  padding: 0 ${theme.space[4]}px;
  margin-bottom: ${theme.space[5]}px;
  border-top: 1px solid ${theme.colors.lightGrey};
  border-bottom: 1px solid ${theme.colors.lightGrey};

  @media screen and ${breakpoint.up('desktop')} {
    margin-bottom: 0;
  }
`

export const Container = styled('div')`
  width: 100%;
  max-width: ${LISTING_DETAILS_MAX_WIDTH}px;
`
