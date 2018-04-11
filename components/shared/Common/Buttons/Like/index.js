import Button from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart'
import {Mutation} from 'react-apollo'
import {FAVORITE_LISTING, UNFAVORITE_LISTING} from 'graphql/listings/mutations'
import {GET_FAVORITE_LISTINGS_IDS} from 'graphql/user/queries'
import Router from 'next/router'
import {setCookie} from 'lib/session'
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
                  query: GET_FAVORITE_LISTINGS_IDS
                }
              ],
              variables: {
                id: props.listing.id
              }
        }}
      >
        <FontAwesomeIcon icon={faHeart} />
      </Button>
    )}
  </Mutation>
)
