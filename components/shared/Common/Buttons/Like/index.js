import Button from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart'
import {Mutation} from 'react-apollo'
import {FAVORITE_LISTING, UNFAVORITE_LISTING} from 'graphql/listings/mutations'
import {GET_FAVORITE_LISTINGS} from 'graphql/user/queries'
export default (props) => (
  <Mutation mutation={!props.favorite ? FAVORITE_LISTING : UNFAVORITE_LISTING}>
    {(favoriteListing) => (
      <Button
        {...props}
        onClick={() => {
          favoriteListing({
            refetchQueries: [
              {
                query: GET_FAVORITE_LISTINGS
              }
            ],
            variables: {
              id: props.listing.id
            }
          })
        }}
      >
        <FontAwesomeIcon icon={faHeart} />
      </Button>
    )}
  </Mutation>
)
