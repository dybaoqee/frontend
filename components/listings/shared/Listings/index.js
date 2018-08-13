import {Component, Fragment} from 'react'
import {Query} from 'react-apollo'
import {GET_USER_LISTINGS_ACTIONS} from 'graphql/user/queries'
import {
  GET_LISTINGS,
  GET_LISTING,
  GET_LISTINGS_COORDINATES
} from 'graphql/listings/queries'
import _ from 'lodash'
import InfiniteScroll from 'components/shared/InfiniteScroll'
import Listing from 'components/listings/shared/Listing'
import Map from 'components/listings/shared/Map'
import ListingsNotFound from 'components/listings/shared/NotFound'
import Container, {MapButton, MapContainer, ListingsContainer} from './styles'
export default class Listings extends Component {
  constructor(props) {
    super(props)

    this.pagination = {
      pageSize: 10,
      excludedListingIds: []
    }

    this.state = {
      mapOpened: false
    }
  }

  getListings = (result, fetchMore) => {
    const {
      user,
      query,
      resetFilters,
      filters,
      onHoverListing,
      onLeaveListing,
      highlight
    } = this.props
    const {mapOpened} = this.state

    const h1Content = !query.neighborhoodSlug
      ? 'Apartamentos e Casas à venda na Zona Sul do Rio de Janeiro'
      : `Apartamentos e Casas à venda - ${query.bairros}, Rio de Janeiro`

    if (result && result.listings.length > 0) {
      return (
        <Query query={GET_USER_LISTINGS_ACTIONS} skip={!user.authenticated}>
          {({data: {userProfile}, loading}) => {
            var filteredListings = _.differenceBy(
              result.listings,
              userProfile.blacklists,
              'id'
            )
            return (
              <InfiniteScroll
                title={h1Content}
                entries={filteredListings}
                remaining_count={result.remainingCount}
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
                horizontal={mapOpened}
              >
                {(listing) => (
                  <Listing
                    onMouseEnter={onHoverListing}
                    onMouseLeave={onLeaveListing}
                    highlight={highlight}
                    key={listing.id}
                    listing={listing}
                    currentUser={user}
                    loading={loading}
                    resumedInfo={mapOpened}
                    favorited={userProfile.favorites || []}
                    blacklists={userProfile.blacklists || []}
                  />
                )}
              </InfiniteScroll>
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

  loadListing = async (id) => {
    const {apolloClient, filters} = this.props
    const footer = document.querySelector('.infinite-scroll-footer')
    footer.scrollIntoView({block: 'end', behavior: 'smooth'})

    const loadedListings = apolloClient.readQuery({
      query: GET_LISTINGS,
      variables: {pagination: this.pagination, filters}
    })

    const {data} = await apolloClient.query({
      query: GET_LISTING,
      variables: {
        id
      }
    })

    const updatedQueryResult = {
      ...loadedListings,
      listings: {
        ...loadedListings.listings,
        remainingCount: loadedListings.listings.remainingCount - 1,
        listings: [...loadedListings.listings.listings, data.listing]
      }
    }

    apolloClient.writeQuery({
      query: GET_LISTINGS,
      variables: {pagination: this.pagination, filters},
      data: updatedQueryResult
    })
    const element = document.querySelector(
      `[aria-label=listing-${data.listing.id}]`
    )
    element.scrollIntoView({block: 'end', behavior: 'smooth'})
  }

  onSelectListing = (id, position) => {
    if (!position) {
      const element = document.querySelector(`[aria-label=listing-${id}]`)

      if (!element) {
        this.loadListing(id)
        return
      }

      element.scrollIntoView({block: 'end', behavior: 'smooth'})
    }
  }

  onHoverListing = (listing) => {
    const {address: {lat, lng}} = listing
    this.setState({highlight: {lat, lng}})
  }

  onLeaveListing = () => {
    this.setState({highlight: {}})
  }

  onChangeMap = (framedListings, {sw, ne}) => {
    const filters = {
      ...this.state.filters,
      minLat: sw.lat,
      minLng: sw.lng,
      maxLat: ne.lat,
      maxLng: ne.lng
    }

    this.setState({filters})
  }

  handleMap = () => {
    const {mapOpened} = this.state
    this.setState({mapOpened: !mapOpened})
  }

  getMap = () => {
    const {highlight, mapOpened} = this.state
    const {filters} = this.props

    return (
      <Query query={GET_LISTINGS_COORDINATES} variables={{filters}}>
        {({data: {listings: mapListings}}) => (
          <Fragment>
            <MapButton opened={mapOpened} onClick={this.handleMap} />
            <MapContainer opened={mapOpened}>
              <Map
                zoom={13}
                onSelect={this.onSelectListing}
                listings={mapListings.listings}
                highlight={highlight}
                onChange={this.onChangeMap}
                updateAfterApiCall
              />
            </MapContainer>
          </Fragment>
        )}
      </Query>
    )
  }

  render() {
    const {mapOpened} = this.state
    const {filters} = this.props

    return (
      <Query
        query={GET_LISTINGS}
        variables={{pagination: this.pagination, filters}}
        fetchPolicy="cache-and-network"
      >
        {({data: {listings}, fetchMore}) => {
          return (
            <Container opened={mapOpened}>
              {this.getMap()}
              <ListingsContainer opened={mapOpened}>
                {this.getListings(listings, fetchMore)}
              </ListingsContainer>
            </Container>
          )
        }}
      </Query>
    )
  }
}
