import {Component} from 'react'
import PropTypes from 'prop-types'
import {Query} from 'react-apollo'
import {GET_FAVORITE_LISTINGS} from 'graphql/user/queries'
import Text from '@emcasa/ui-dom/components/Text'
import ListingCard from 'components/listings/shared/ListingCard'
import {Container, ListingsContainer, Gradient} from './styles'

class ListingFeed extends Component {
  render() {
    const {listings, currentUser} = this.props
    return (
      <Query
        query={GET_FAVORITE_LISTINGS}
        skip={!currentUser || !currentUser.authenticated}
        ssr={true}
      >
        {({error, data}) => {
          if (!listings) {
            return null
          }
          if (error) {
            return `Error!: ${error}`
          }
          let favorites = []
          const userProfile = data ? data.userProfile : null
          if (userProfile && userProfile.favorites) {
            favorites = userProfile.favorites
          }
          return (
            <Container>
              <Text as="h3" color="grey" fontWeight="bold">
                Veja também
              </Text>
              <ListingsContainer>
                {listings.map((listing) => {
                  return (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      currentUser={currentUser}
                      favorited={favorites}
                      related
                    />
                  )
                })}
              </ListingsContainer>
              <Gradient />
            </Container>
          )
        }}
      </Query>
    )
  }
}

ListingFeed.propTypes = {
  listings: PropTypes.array,
  currentUser: PropTypes.object
}

export default ListingFeed
