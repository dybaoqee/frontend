import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import {Mutation} from 'react-apollo'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart'
import AccountKit from 'components/shared/Auth/AccountKit'
import {FAVORITE_LISTING, UNFAVORITE_LISTING} from 'graphql/listings/mutations'
import {GET_USER_LISTINGS_ACTIONS} from 'graphql/user/queries'
import Button from './styles'
import {
  log,
  LISTING_SEARCH_FAVORITE_LISTING
} from 'lib/logging'

class LikeButton extends Component {
  render() {
    const { favorite, top, user, listing } = this.props
    return (
      <Mutation mutation={!favorite ? FAVORITE_LISTING : UNFAVORITE_LISTING}>
        {(favoriteListing) => (
          <AccountKit
            appId={process.env.FACEBOOK_APP_ID}
            appSecret={process.env.ACCOUNT_KIT_APP_SECRET}
            version="v1.0"
            skipRedirect
            onSuccess={() => {
              Router.replace(location.pathname)
            }}
          >
            {({signIn}) =>
              <Button
                {...this.props}
                onClick={(e) => {
                  e.preventDefault()
                  if (user && user.authenticated) {
                    log(LISTING_SEARCH_FAVORITE_LISTING, {listingId: listing.id, favorited: !favorite})
                    favoriteListing({
                      refetchQueries: [
                        {
                          query: GET_USER_LISTINGS_ACTIONS
                        }
                      ],
                      variables: {
                        id: listing.id
                      },
                      optimisticResponse: {
                        __typename: 'Query',
                        [!favorite ? 'favoriteListing' : 'unfavoriteListing']: {
                          __typename: 'ListingUser',
                          listing: {
                            __typename: 'Listing',
                            id: listing.id
                          }
                        }
                      },
                      update: (proxy) => {
                        // Read the data from our cache for this query.
                        let data = proxy.readQuery({
                          query: GET_USER_LISTINGS_ACTIONS
                        })
                        if (!favorite) {
                          data.userProfile.favorites.push({
                            id: listing.id.toString(),
                            __typename: 'Listing'
                          })
                        } else {
                          const removed = data.userProfile.favorites.filter(
                            (listing) =>
                              listing.id.toString() !== listing.id.toString()
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
                    signIn()
                  }
                }}
              >
                <FontAwesomeIcon icon={faHeart} />
                Salvar
              </Button>
            }
          </AccountKit>
        )}
      </Mutation>
    )
  }
}

LikeButton.propTypes = {
  favorite: PropTypes.bool,
  top: PropTypes.number,
  user: PropTypes.object,
  listing: PropTypes.object
}

export default LikeButton
