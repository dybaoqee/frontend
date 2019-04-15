import styled from 'styled-components'
import Row from '@emcasa/ui-dom/components/Row'
import {breakpoint} from '@emcasa/ui/lib/styles'

const VideoContainer = styled(Row)`
  justify-content: center;
  flex-wrap: wrap;

  @media screen and ${breakpoint.down('tablet')} {
    align-items: center;
  }
`

export {VideoContainer}
