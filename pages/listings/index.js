import {Component, Fragment} from 'react'
import slugify from 'slug'
import Head from 'next/head'
import Router from 'next/router'
import {Query} from 'react-apollo'
import scrollIntoView from 'scroll-into-view'

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

    this.state = {
      mapOpened: false,
      filters: getFiltersForGraphQL(props.query)
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

  onChangeFilter = (name, value) => {
    const {query} = this.props
    const filters = getDerivedParams(query)

    const params = treatParams({
      ...filters,
      [name]: value
    })
    if (params) {
      const splittedParams = params.split('&')
      const newQuery = splittedParams.reduce((prev, atual) => {
        const value = atual.split('=')
        prev[value[0]] = value[1]
        return prev
      }, {})

      Router.push({
        pathname: '/listings',
        asPath: '/imoveis',
        shallow: true,
        query: newQuery
      })

      this.setState({filters: getFiltersForGraphQL(newQuery)})
    } else {
      this.onResetFilter()
    }
  }

  onResetFilter = () => {
    this.setState({filters: getFiltersForGraphQL({})})
    Router.push('/listings', '/imoveis')
  }

  loadListing = async (id) => {
    const {client} = this.props

    this.listings.updateLoadingState(true)

    const footer = document.querySelector('.infinite-scroll-footer')

    scrollIntoView(footer, {
      time: 500,
      align: {
        top: 1,
        left: 1
      }
    })

    const loadedListings = client.readQuery({
      query: GET_LISTINGS,
      variables: {
        pagination: this.pagination,
        filters: this.state.filters
      }
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
      variables: {
        pagination: this.pagination,
        filters: this.state.filters
      },
      data: updatedQueryResult
    })
    this.listingsLoaded.push(data.listing.id)
    const element = document.getElementById(`listing-${data.listing.id}`)

    scrollIntoView(
      element,
      {
        time: 500,
        align: {
          top: 1,
          left: 1
        }
      },
      () => {
        this.listings.updateLoadingState(false)
      }
    )
  }

  onSelectListing = (id, position) => {
    if (!position) {
      const element = document.getElementById(`listing-${id}`)

      if (!element) {
        this.loadListing(id)
        return
      }

      scrollIntoView(element, {
        time: 500,
        align: {
          top: 1,
          left: 1
        }
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

  loadedListings = (listingsLoaded, pagination) => {
    this.listingsLoaded = listingsLoaded
    this.pagination = pagination
  }

  render() {
    const {neighborhoods, query, user} = this.props
    const {mapOpened, filters, highlight} = this.state

    return (
      <Fragment>
        {this.getHead()}
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
            resetFilters={this.onResetFilter}
            onLoadListings={this.loadedListings}
            mapOpenedOnMobile={mapOpened}
            highlight={highlight}
            ref={(listings) => (this.listings = listings)}
          />
        </Container>
      </Fragment>
    )
  }
}

export default ListingsIndex
