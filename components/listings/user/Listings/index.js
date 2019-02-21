import {Component, Fragment} from 'react'
import {Query} from 'react-apollo'
import {GET_USER_LISTINGS} from 'graphql/user/queries'
import {GET_LISTINGS, GET_LISTING} from 'graphql/listings/queries'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import InfiniteScroll from 'components/shared/InfiniteScroll'
import Listing from 'components/listings/shared/Listing'
import Map from 'components/listings/shared/Map'
import ListingsNotFound from 'components/listings/shared/NotFound'
import Container, {MapButton, MapContainer, ListingsContainer} from './styles'
import {filterListings} from 'lib/listings'

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

  getListings = (result, userProfile, fetchMore) => {
    const {
      user,
      resetFilters,
      filters,
      onHoverListing,
      onLeaveListing,
      highlight
    } = this.props

    const {mapOpened} = this.state

    const h1Content = 'Meus imóveis'
    if (result && result.length > 0) {
      return (
        <InfiniteScroll
          title={h1Content}
          entries={result}
          remaining_count={0}
          onLoad={async () => {
            const loadedListings = await fetchMore({
              variables: {
                pagination: {
                  ...this.pagination,
                  excludedListingIds: map(result.listings, 'id')
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
                    remainingCount: fetchMoreResult.listings.remainingCount,
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
              loading={this.loading}
              resumedInfo={mapOpened}
              favorited={userProfile.favorites || []}
            />
          )}
        </InfiniteScroll>
      )
    } else {
      return (
        <ListingsNotFound
          filters={this.props.filters}
          params={this.props.params}
        />
      )
    }
  }

  loadListing = async (id) => {
    const {apolloClient} = this.props
    const footer = document.querySelector('.infinite-scroll-footer')
    footer.scrollIntoView({block: 'end', behavior: 'smooth'})

    const loadedListings = apolloClient.readQuery({
      query: GET_LISTINGS
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

  getMap = (listings) => {
    const {highlight, mapOpened} = this.state

    return (
      <Fragment>
        <MapButton opened={mapOpened} onClick={this.handleMap} />
        <MapContainer opened={mapOpened}>
          <Map
            zoom={13}
            onSelect={this.onSelectListing}
            listings={listings}
            highlight={highlight}
            onChange={this.onChangeMap}
            updateAfterApiCall
          />
        </MapContainer>
      </Fragment>
    )
  }

  render() {
    const {mapOpened} = this.state
    const {filters} = this.props

    return (
      <Query
        query={GET_USER_LISTINGS}
        variables={{pagination: this.pagination, filters}}
        fetchPolicy="cache-and-network"
      >
        {({data: {userProfile}, fetchMore}) => {
          const filtered = !isEmpty(filters)
          const listings = filtered
            ? filterListings(userProfile.listings, filters)
            : userProfile.listings

          return (
            <Container opened={mapOpened}>
              {this.getMap(listings)}
              <ListingsContainer opened={mapOpened}>
                {this.getListings(listings, userProfile, fetchMore)}
              </ListingsContainer>
            </Container>
          )
        }}
      </Query>
    )
  }
}
