import Button from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart'
import {Mutation} from 'react-apollo'
import {FAVORITE_LISTING, UNFAVORITE_LISTING} from 'graphql/listings/mutations'
import {GET_USER_LISTINGS_ACTIONS} from 'graphql/user/queries'
import Router from 'next/router'
import {setCookie} from 'lib/session'
import {buildSlug} from 'lib/listings'
const LikeButton = (props) => (
  <Mutation mutation={!props.favorite ? FAVORITE_LISTING : UNFAVORITE_LISTING}>
    {(favoriteListing) => (
      <Button
        {...props}
        onClick={() => {
          if (props.user && props.user.authenticated) {
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
        <FontAwesomeIcon icon={faHeart} />
      </Button>
    )}
  </Mutation>
)

export default LikeButton
