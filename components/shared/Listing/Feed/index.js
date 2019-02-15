import {Component} from 'react'
import ListingCard from 'components/listings/shared/ListingCard'
import {
  Container,
  ListingsContainer
} from './styles'
import Text from '@emcasa/ui-dom/components/Text'

export default class ListingFeed extends Component {
  render() {
    const {listings, related} = this.props

    return (
      <Container>
        <Text>VEJA TAMBÉM</Text>
        <ListingsContainer related={related}>
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              favorited={[]}
            />
          ))}
        </ListingsContainer>
      </Container>
    )
  }
}
