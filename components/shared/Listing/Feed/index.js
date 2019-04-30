import {Component} from 'react'
import PropTypes from 'prop-types'
import {Query} from 'react-apollo'
import {GET_LISTINGS} from 'graphql/listings/queries'
import Link from 'next/link'
import {buildNeighborhoodSlug} from 'lib/listings'
import {log, LISTING_DETAIL_MORE_LISTINGS_BUTTON} from 'lib/logging'
import Text from '@emcasa/ui-dom/components/Text'
import ListingCard from 'components/listings/shared/ListingCard'
import ListingFeedGrid from './Grid'
import {
  Wrapper,
  MoreButtonWrapper,
  MoreButton
} from './styles'

class ListingFeed extends Component {
  render() {
    const {currentUser, currentListing, variables} = this.props
    return (
      <Query
        query={GET_LISTINGS}
        variables={variables}
        ssr={true}
      >
        {({error, data}) => {
          if (!data) {
            return null
          }
          if (error) {
            return `Error!: ${error}`
          }

          return (
            <Wrapper>
              <ListingFeedGrid
                title="Outros imóveis no bairro"
                listings={data.listings.listings}
                currentUser={currentUser}
              >
                <MoreButtonWrapper>
                  <Link
                    href={`/listings`}
                    as={buildNeighborhoodSlug(currentListing)}
                    passHref
                  >
                    <MoreButton
                      as="a"
                      height="tall"
                      onClick={() => {
                        log(LISTING_DETAIL_MORE_LISTINGS_BUTTON, {listingId: currentListing.id})
                      }}
                    >
                      Ver mais imóveis
                    </MoreButton>
                  </Link>
                </MoreButtonWrapper>
              </ListingFeedGrid>
            </Wrapper>
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
