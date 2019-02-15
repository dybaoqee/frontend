import {Component} from 'react'
import { Query } from 'react-apollo'
import { GET_FAVORITE_LISTINGS } from 'graphql/user/queries'

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
      <Query query={GET_FAVORITE_LISTINGS}>
        {({loading, error, data: {userProfile}}) => {
          if (loading) return <div />
          if (error) return `Error!: ${error}`
          let favorites = []
          if (userProfile && userProfile.favorites) {
            favorites = userProfile.favorites
          }
          return (
            <Container>
              <SubTitle color="grey" fontSize="small">VEJA TAMBÉM</SubTitle>
              <ListingsContainer related={related}>
                {listings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    currentUser={userProfile}
                    favorited={favorites}
                  />
                ))}
              </ListingsContainer>
              <Gradient />
            </Container>
        )}}
      </Query>
    )
  }
}
