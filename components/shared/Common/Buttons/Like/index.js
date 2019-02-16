import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart'
import {Mutation} from 'react-apollo'
import {FAVORITE_LISTING, UNFAVORITE_LISTING} from 'graphql/listings/mutations'
import {GET_USER_LISTINGS_ACTIONS} from 'graphql/user/queries'
import Router from 'next/router'
import {setCookie} from 'lib/session'
import {buildSlug} from 'lib/listings'
import { Button, Container } from './styles'
import {
  log,
  LISTING_SEARCH_FAVORITE_LISTING
} from 'lib/logging'

const LikeButton = (props) => (
  <Mutation mutation={!props.favorite ? FAVORITE_LISTING : UNFAVORITE_LISTING}>
    {(favoriteListing) => (
      <Container
        top={props.top}
        onClick={(e) => {
          e.preventDefault()
          if (props.user && props.user.authenticated) {
            log(LISTING_SEARCH_FAVORITE_LISTING, {listingId: props.listing.id, favorited: !props.favorite})
            favoriteListing({
              refetchQueries: [
                {
                  query: GET_USER_LISTINGS_ACTIONS
                }
              ],
              variables: {
                id: props.listing.id
              },
              optimisticResponse: {
                __typename: 'Query',
                [!props.favorite ? 'favoriteListing' : 'unfavoriteListing']: {
                  __typename: 'ListingUser',
                  listing: {
                    __typename: 'Listing',
                    id: props.listing.id
                  }
                }
              },
              update: (proxy) => {
                // Read the data from our cache for this query.
                let data = proxy.readQuery({
                  query: GET_USER_LISTINGS_ACTIONS
                })
                if (!props.favorite) {
                  data.userProfile.favorites.push({
                    id: props.listing.id.toString(),
                    __typename: 'Listing'
                  })
                } else {
                  const removed = data.userProfile.favorites.filter(
                    (listing) =>
                      listing.id.toString() !== props.listing.id.toString()
                  )
                  data.userProfile.favorites = removed
                }

                // Write our data back to the cache.
                proxy.writeQuery({
                  query: GET_USER_LISTINGS_ACTIONS,
                  data
                })
              }
            })
          } else {
            setCookie(
              'redirectTo',
              `/listings/show?id=${props.listing.id}&f#as#${buildSlug(
                props.listing
              )}&f`
            )
            Router.push({
              pathname: '/auth/login'
            })
          }
        }}
      >
        <Button
          {...props}
        >
          <FontAwesomeIcon icon={faHeart} />
        </Button>
      </Container>
    )}
  </Mutation>
)

export default LikeButton
