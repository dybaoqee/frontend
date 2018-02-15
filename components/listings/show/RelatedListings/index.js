import {Component} from 'react'

import ListingFeed from 'components/shared/ListingFeed'
import Container from './styles'

export default class RelatedListings extends Component {
  render() {
    return (
      <Container>
        <h3>Veja também:</h3>
        <ListingFeed {...this.props} />
      </Container>
    )
  }
}
