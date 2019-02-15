import {Component} from 'react'
import ListingCard from 'components/listings/shared/ListingCard'
import {
  Container,
  ListingsContainer,
  SubTitle,
  Gradient
} from './styles'

export default class ListingFeed extends Component {
  render() {
    const {listings, related} = this.props

    return (
      <Container>
        <SubTitle color="grey" fontSize="small">VEJA TAMBÉM</SubTitle>
        <ListingsContainer related={related}>
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              favorited={[]}
            />
          ))}
        </ListingsContainer>
        <Gradient />
      </Container>
    )
  }
}
