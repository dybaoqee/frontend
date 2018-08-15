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
const BlacklistButton = (props) => (
  <Mutation
    mutation={!props.blacklisted ? BLACKLIST_LISTING : UNBLACKLIST_LISTING}
  >
    {(blacklist) => (
      <Button
        {...props}
        onClick={() => {
          if (props.user && props.user.authenticated) {
            blacklist({
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
              }
            })
          } else {
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
