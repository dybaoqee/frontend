import Button from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEyeSlash from '@fortawesome/fontawesome-pro-light/faEyeSlash'
import faEye from '@fortawesome/fontawesome-pro-light/faEye'
import {Mutation} from 'react-apollo'
import {
  BLACKLIST_LISTING,
  UNBLACKLIST_LISTING
} from 'graphql/listings/mutations'
import {GET_USER_LISTINGS_ACTIONS} from 'graphql/user/queries'
import Router from 'next/router'
import {setCookie} from 'lib/session'
import {buildSlug} from 'lib/listings'
const BlacklistButton = (props) => (
  <Mutation
    mutation={!props.blacklisted ? BLACKLIST_LISTING : UNBLACKLIST_LISTING}
  >
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
                [!props.blacklisted
                  ? 'listingBlacklist'
                  : 'listingUnblacklist']: {
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
                  data.userProfile.blacklists.push({
                    id: props.listing.id.toString(),
                    __typename: 'Listing'
                  })
                } else {
                  const removed = data.userProfile.blacklists.filter(
                    (listing) =>
                      listing.id.toString() !== props.listing.id.toString()
                  )
                  data.userProfile.blacklists = removed
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
              )}&b`
            )
            Router.push({
              pathname: '/auth/login'
            })
          }
        }}
      >
        <FontAwesomeIcon icon={!props.blacklisted ? faEyeSlash : faEye} />
      </Button>
    )}
  </Mutation>
)

export default BlacklistButton
