import {Component} from 'react'
import Listing from 'components/shared/Listing'
import Container from './styles'

export default class ListingFeed extends Component {
  render() {
    const {listings, related} = this.props

    return (
      <Container related={related}>
        {listings.map((listing) => <Listing key={listing.id} {...listing} />)}
      </Container>
    )
  }
}
