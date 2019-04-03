import styled from 'styled-components'
import theme from 'config/theme'
import Row from '@emcasa/ui-dom/components/Row'
import {breakpoint} from '@emcasa/ui/lib/styles'

export const LISTING_DETAILS_MAX_WIDTH = 1174

export const Container = styled(Row)`
  width: 100%;
  max-width: ${LISTING_DETAILS_MAX_WIDTH}px;
  flex-direction: column;
  padding: 0 ${theme.space[4]}px;

  @media screen and ${breakpoint.up('desktop')} {
    flex-direction: row;
  }
`