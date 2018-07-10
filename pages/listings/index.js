import React, {Component, Fragment} from 'react'
import slugify from 'slug'
import Head from 'next/head'
import Router from 'next/router'
import {Query} from 'react-apollo'

import {
  GET_LISTINGS,
  GET_LISTING,
  GET_LISTINGS_COORDINATES
} from 'graphql/listings/queries'
import {
  treatParams,
  getDerivedParams,
  getFiltersForGraphQL
} from 'utils/filter-params.js'
import {getNeighborhoods} from 'services/neighborhood-api'
import MapContainer from 'components/listings/index/Map'
import Filter from 'components/listings/index/Search'
import Listings from 'components/listings/index/Listings'
import Container, {MapButton} from './styles'

class ListingsIndex extends Component {
  constructor(props) {
    super(props)

    const filters = getDerivedParams(props.query)
    const filtersForGraphQL = getFiltersForGraphQL(filters)

    this.state = {
      mapOpened: false,
      filters: filtersForGraphQL
    }
    this.listingsLoaded = []
  }

  static async getInitialProps(context) {
    let neighborhoods = []
    neighborhoods = await getNeighborhoods().then(
      ({data}) => data.neighborhoods
    )
    if (context.query.neighborhoodSlug) {
      context.query.bairros = neighborhoods.filter(
        (neighborhood) =>
          slugify(neighborhood).toLowerCase() === context.query.neighborhoodSlug
      )[0]
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

  onChangeFilter = (filters) => {
    const newQuery = treatParams(filters)

    const newFilters = {
      ...this.state.filters,
      ...getFiltersForGraphQL(filters)
    }

    window.scrollTo(0, 0)

    this.setState({filters: newFilters})

    if (newQuery.length) {
      Router.push(`/listings/index?${newQuery}`, `/imoveis?${newQuery}`, {
        shallow: true
      })
    } else {
      Router.push('/listings/index', '/imoveis')
    }
  }

  onResetFilter = () => {
    this.setState({filters: getFiltersForGraphQL({})})
    Router.push('/listings', '/imoveis')
  }

  loadListing = async (id) => {
    const {client} = this.props
    const footer = document.querySelector('.infinite-scroll-footer')
    footer.scrollIntoView({block: 'end', behavior: 'smooth'})

    const loadedListings = client.readQuery({
      query: GET_LISTINGS
    })

    const {data} = await client.query({
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

    client.writeQuery({
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
    const {highlight, mapOpened, filters} = this.state

    return (
      <Query query={GET_LISTINGS_COORDINATES} variables={{filters}}>
        {({data: {listings: mapListings}}) => (
          <Fragment>
            <MapButton opened={mapOpened} onClick={this.handleMap} />
            <div className="map">
              <MapContainer
                zoom={13}
                onSelect={this.onSelectListing}
                listings={mapListings ? mapListings.listings : []}
                highlight={highlight}
                onChange={this.onChangeMap}
                updateAfterApiCall
              />
            </div>
          </Fragment>
        )}
      </Query>
    )
  }

  render() {
    const {neighborhoods, query, user} = this.props
    const {mapOpened, filters, highlight} = this.state

    return (
      <Fragment>
        {this.getHead()}
        <Filter
          neighborhoods={neighborhoods}
          onChange={this.onChangeFilter}
          onReset={this.onResetFilter}
          initialFilters={getDerivedParams(query)}
        />
        <Container opened={mapOpened}>
          {this.getMap()}
          <Listings
            query={query}
            user={user}
            filters={filters}
            resetFilters={this.onResetFilter}
            mapOpenedOnMobile={mapOpened}
            highlight={highlight}
          />
        </Container>
      </Fragment>
    )
  }
}

export default ListingsIndex
