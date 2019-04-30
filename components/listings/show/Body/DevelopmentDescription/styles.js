import styled from 'styled-components'
import Container, * as ListingDescriptionStyles from '../ListingDescription/styles'

export const TITLE_HEIGHT = 50

export default Container

export const Content = styled(ListingDescriptionStyles.Content)`
  ${({expanded}) => !expanded && 'max-height: 0px'};
  &:after {
    content: ' ';
    display: table;
    height: ${TITLE_HEIGHT}px;
  }
`

Content.defaultProps = {
  collapsedHeight: 0
}

export const P = ListingDescriptionStyles.P

export const Title = styled(ListingDescriptionStyles.Title)`
  height: ${TITLE_HEIGHT}px;
`

export const BottomRow = styled(ListingDescriptionStyles.BottomRow)`
  margin-top: -${TITLE_HEIGHT}px;
  height: ${TITLE_HEIGHT}px;
`
