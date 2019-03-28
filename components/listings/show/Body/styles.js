import styled from 'styled-components'
import theme from 'config/theme'
import Text from '@emcasa/ui-dom/components/Text'
import View from '@emcasa/ui-dom/components/View'
import {breakpoint} from '@emcasa/ui/lib/styles'

export const LISTING_DETAILS_MAX_WIDTH = 1004

export default styled.div`
  display: flex;
  width: 100%;
  max-width: ${LISTING_DETAILS_MAX_WIDTH}px;
`

export const Title = Text.withComponent('h2')

export const SubTitle = Text.withComponent('h3')

export const ListingDescription = styled.div`
  position: relative;
  margin: 0 ${theme.space[4]}px ${theme.space[4]}px 0;

  @media ${breakpoint.down('tablet')} {
    ${({expanded}) => expanded ? `height: auto;` : `height: 400px; overflow: hidden;`}
    margin-right: 0;
  }
`
