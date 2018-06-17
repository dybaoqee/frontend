import {Component, Fragment} from 'react'
import slugify from 'slug'
import _ from 'lodash'
import Head from 'next/head'
import Router from 'next/router'
import {Query} from 'react-apollo'
import {GET_FAVORITE_LISTINGS_IDS} from 'graphql/user/queries'
import {GET_LISTINGS, GET_LISTINGS_COORDINATES} from 'graphql/listings/queries'
import {
  treatParams,
  getDerivedParams,
  getFiltersForGraphQL
} from 'utils/filter-params.js'
import {getNeighborhoods} from 'services/neighborhood-api'
import InfiniteScroll from 'components/shared/InfiniteScroll'
import MapContainer from 'components/listings/index/Map'
import Listing from 'components/listings/index/Listing'
import ListingsNotFound from 'components/listings/index/NotFound'
import Filter from 'components/listings/index/Search'
import Container, {MapButton} from './styles'

class Listings extends Component {
  constructor(props) {
    super(props)

    this.pagination = {
      pageSize: 20,
      excludedListingIds: []
    }

    this.filters = getFiltersForGraphQL(props.query)
  }
  getListings = (loadingListings, result, fetchMore) => {
    const {user, query, mapOpenedOnMobile, resetFilters, filters} = this.props

    const h1Content = !query.neighborhoodSlug
      ? 'Apartamentos e Casas à venda na Zona Sul do Rio de Janeiro'
      : `Apartamentos e Casas à venda - ${query.bairros}, Rio de Janeiro`

    if (result && result.listings.length > 0) {
      return (
        <Query query={GET_FAVORITE_LISTINGS_IDS} skip={!user.authenticated}>
          {({data, loading, error}) => {
            return (
              <Fragment>
                <InfiniteScroll
                  title={h1Content}
                  entries={result.listings}
                  remaining_count={result.remainingCount}
                  loading={loadingListings}
                  onLoad={() =>
                    fetchMore({
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
                  }
                  mapOpenedOnMobile={mapOpenedOnMobile}
                >
                  {(listing) => (
                    <Listing
                      // onMouseEnter={this.onHoverListing}
                      // onMouseLeave={this.onLeaveListing}
                      //highlight={highlight}
                      key={listing.id}
                      id={`listing-${listing.id}`}
                      listing={listing}
                      currentUser={user}
                      loading={loading}
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
    const {pagination, neighborhoods, query, mapOpened, filters} = this.props

    return (
      <Query
        query={GET_LISTINGS}
        variables={{pagination: this.pagination, filters}}
        fetchPolicy="cache-and-network"
      >
        {({data: {listings}, loading, fetchMore}) => {
          return (
            <div className="entries-container">
              {this.getListings(loading, listings, fetchMore)}
            </div>
          )
        }}
      </Query>
    )
  }
}

class ListingsIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mapOpened: false,
      filters: getFiltersForGraphQL(props.query),
      pageSize: 3
    }

    this.filters = getFiltersForGraphQL(props.query)
  }

  static async getInitialProps(context) {
    let neighborhoods = []

    if (context.req) {
      neighborhoods = await getNeighborhoods().then(
        ({data}) => data.neighborhoods
      )
      if (context.query.neighborhoodSlug) {
        context.query.bairros = neighborhoods.filter(
          (neighborhood) =>
            slugify(neighborhood).toLowerCase() ===
            context.query.neighborhoodSlug
        )[0]
      }
    } else {
      neighborhoods = window.__NEXT_DATA__.props.pageProps.neighborhoods
    }

    return {
      neighborhoods,
      query: context.query,
      renderFooter: false
    }
  }

  componentDidMount() {
    require('utils/polyfills/smooth-scroll').load()
  }

  onChangeFilter = (name, value) => {
    const {query} = this.props
    const filters = getDerivedParams(query)

    const params = treatParams({
      ...filters,
      [name]: value
    })

    const newUrl = `/listings/index?${params}`
    if (params) {
      Router.push(newUrl, `/imoveis?${params}`, {
        shallow: true
      })
    } else {
      Router.push('/listings/index', '/imoveis', {
        shallow: true
      })
    }
  }

  onResetFilter = () => {
    Router.push('/listings/index', '/imoveis')
  }

  onSelectListing = (id, position) => {
    if (!position) {
      const element = document.getElementById(`listing-${id}`)
      element.scrollIntoView({
        behavior: 'smooth'
      })
    } else {
      this.setState({highlight: {...position}})
    }
  }

  onHoverListing = (listing) => {
    const {address: {lat, lng}} = listing
    this.setState({highlight: {lat, lng}})
  }

  onLeaveListing = () => {
    this.setState({highlight: {}})
  }

  onChangeMap = (listings, refetch, framedListings, bounds) => {
    this.setState({
      filters: {
        ...this.state.filters,
        minLat: bounds.sw.lat,
        minLng: bounds.sw.lng,
        maxLat: bounds.ne.lat,
        maxLng: bounds.ne.lng
      },
      pageSize: listings.length > 0 ? listings.length : 3
    })
  }

  handleMap = () => {
    const {mapOpened} = this.state
    this.setState({mapOpened: !mapOpened})
  }

  getHead = () => {
    const {query} = this.props
    const seoImgSrc =
      'https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/home-2018-04-03_cozxd9.jpg'
    const title = !query.neighborhoodSlug
      ? 'Apartamentos e Casas à venda na Zona Sul do Rio de Janeiro | EmCasa'
      : `Apartamentos e Casas à venda - ${
          query.bairros
        }, Rio de Janeiro | EmCasa`
    const description = !query.neighborhoodSlug
      ? 'Conheça em Compre Apartamentos e Casas à venda na Zona Sul do Rio de Janeiro com o sistema exclusivo de Tour 3D da EmCasa'
      : `Conheça em Compre Apartamentos e Casas à venda - ${
          query.bairros
        }, Zona Sul do Rio de Janeiro com o sistema exclusivo de Tour 3D da EmCasa`

    return (
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={seoImgSrc} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={seoImgSrc} />
      </Head>
    )
  }

  getMap = () => {
    const {highlight, mapOpened} = this.state
    return (
      <Query query={GET_LISTINGS_COORDINATES}>
        {({data: {listings: mapListings}}) => (
          <Fragment>
            {this.getHead()}
            <MapButton opened={mapOpened} onClick={this.handleMap} />
            <div className="map">
              <MapContainer
                zoom={13}
                onSelect={this.onSelectListing}
                listings={mapListings ? mapListings.listings : []}
                highlight={highlight}
                onChange={this.onChangeMap.bind(null, [], () => {})}
              />
            </div>
          </Fragment>
        )}
      </Query>
    )
  }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log('ATUALIZANDO')
  //   for (const index in nextProps) {
  //     if (nextProps[index] !== this.props[index]) {
  //       console.log(index, this.props[index], '-PROS->', nextProps[index])
  //     }
  //   }
  //
  //   for (const indice in nextState) {
  //     if (nextState[indice] !== this.state[indice]) {
  //       console.log(indice, this.state[indice], '-STATE->', nextState[indice])
  //     }
  //   }
  // }

  render() {
    const {pagination} = this
    const {neighborhoods, query, user} = this.props
    const {mapOpened, filters, pageSize} = this.state

    return (
      <Fragment>
        <Filter
          params={getDerivedParams(query)}
          neighborhoods={neighborhoods}
          onChange={this.onChangeFilter}
          onReset={this.onResetFilter}
        />
        <Container opened={mapOpened}>
          {this.getMap()}
          <Listings
            query={query}
            user={user}
            filters={filters}
            pagination={pagination}
            resetFilters={this.onResetFilter}
            pageSize={pageSize}
          />
        </Container>
      </Fragment>
    )
  }
}

export default ListingsIndex
