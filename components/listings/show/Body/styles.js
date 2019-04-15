import styled from 'styled-components'
import theme from 'config/theme'
import Row from '@emcasa/ui-dom/components/Row'
import {breakpoint} from '@emcasa/ui/lib/styles'
import {listingDetailsMaxWidth} from 'constants/dimensions'

export const Container = styled(Row)`
  width: 100%;
  max-width: ${listingDetailsMaxWidth}px;
  flex-direction: column;
  padding: 0 ${theme.space[4]}px;
  box-sizing: border-box;

  @media screen and ${breakpoint.up('desktop')} {
    flex-direction: row;
  }
`