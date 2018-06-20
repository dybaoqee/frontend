import {Component, Fragment} from 'react'
import {Query} from 'react-apollo'
import {GET_FAVORITE_LISTINGS_IDS} from 'graphql/user/queries'
import {GET_LISTINGS} from 'graphql/listings/queries'
import _ from 'lodash'
import InfiniteScroll from 'components/shared/InfiniteScroll'
import Listing from 'components/listings/index/Listing'
import ListingsNotFound from 'components/listings/index/NotFound'
export default class Listings extends Component {
  constructor(props) {
    super(props)

    this.pagination = {
      pageSize: 20,
      excludedListingIds: []
    }

    this.loading = false
  }

  updateLoadingState = (state) => {
    this.loading = state
  }

  getListings = (result, fetchMore) => {
    const {
      user,
      query,
      mapOpenedOnMobile,
      resetFilters,
      filters,
      onLoadListings,
      onHoverListing,
      onLeaveListing,
      highlight
    } = this.props

    const h1Content = !query.neighborhoodSlug
      ? 'Apartamentos e Casas à venda na Zona Sul do Rio de Janeiro'
      : `Apartamentos e Casas à venda - ${query.bairros}, Rio de Janeiro`

    if (result && result.listings.length > 0) {
      onLoadListings &&
        onLoadListings(_.map(result.listings, 'id'), this.pagination)
      return (
        <Query query={GET_FAVORITE_LISTINGS_IDS} skip={!user.authenticated}>
          {({data, error}) => {
            return (
              <Fragment>
                <InfiniteScroll
                  title={h1Content}
                  entries={result.listings}
                  remaining_count={result.remainingCount}
                  loading={this.loading}
                  onLoad={async () => {
                    const loadedListings = await fetchMore({
                      variables: {
                        pagination: {
                          ...this.pagination,
                          excludedListingIds: _.map(result.listings, 'id')
                        }
                      },
                      updateQuery: (
                        prev,
                        {fetchMoreResult, variables: {pagination}}
                      ) => {
                        if (!fetchMoreResult) return prev
                        this.pagination = pagination
                        const result = {
                          ...prev,
                          listings: {
                            ...prev.listings,
                            remainingCount:
                              fetchMoreResult.listings.remainingCount,
                            listings: [
                              ...prev.listings.listings,
                              ...fetchMoreResult.listings.listings
                            ]
                          }
                        }
                        return result
                      }
                    })

                    return loadedListings
                  }}
                  mapOpenedOnMobile={mapOpenedOnMobile}
                >
                  {(listing) => (
                    <Listing
                      onMouseEnter={onHoverListing}
                      onMouseLeave={onLeaveListing}
                      highlight={highlight}
                      key={listing.id}
                      id={`listing-${listing.id}`}
                      listing={listing}
                      currentUser={user}
                      loading={this.loading}
                      mapOpenedOnMobile={mapOpenedOnMobile}
                      favorited={
                        error || !data.favoritedListings
                          ? []
                          : data.favoritedListings
                      }
                    />
                  )}
                </InfiniteScroll>
              </Fragment>
            )
          }}
        </Query>
      )
    } else {
      return (
        <ListingsNotFound
          filtered={!_.isEmpty(filters)}
          resetAllParams={resetFilters}
        />
      )
    }
  }

  render() {
    const {filters} = this.props

    return (
      <Query
        query={GET_LISTINGS}
        variables={{pagination: this.pagination, filters}}
        fetchPolicy="cache-and-network"
        notifyOnNetworkStatusChange
      >
        {({data: {listings}, fetchMore}) => {
          return (
            <div className="entries-container">
              {this.getListings(listings, fetchMore)}
            </div>
          )
        }}
      </Query>
    )
  }
}
