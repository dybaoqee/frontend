import {Component} from 'react'

import ListingFeed from 'components/shared/Listing/Feed'
import Container from './styles'

export default class RelatedListings extends Component {
  render() {
    return (
      <Container>
        <ListingFeed {...this.props} />
      </Container>
    )
  }
}
