import '@emcasa/ui-dom/components/global-styles'
import {Component} from 'react'
import {ThemeProvider} from 'styled-components'
import theme from '@emcasa/ui'
import NextHead from 'components/shared/NextHead'
import Router from 'next/router'
import {
  treatParams,
  getDerivedParams,
  getListingFiltersFromState,
  getNewFiltersFromQuery,
  getLocationFromPath
} from 'utils/filter-params.js'
import ListingFilter from 'components/listings/shared/ListingFilter'
import ListingList from 'components/listings/shared/ListingList'
import {getUrlVars} from 'utils/text-utils'
import {imageUrl} from 'utils/image_url'
import {
  log,
  LISTING_SEARCH_OPEN
} from 'lib/logging'

class ListingSearch extends Component {
  constructor(props) {
    super(props)
    this.handleRouteChange = this.handleRouteChange.bind(this)
    const params = props.params ? props.params : {}
    const query = props.query ? props.query : {}
    const filters = getNewFiltersFromQuery(query, params)
    this.state = {
      mapOpened: false,
      filters,
      neighborhood: null
    }
  }

  static async getInitialProps(context) {
    let params = {}
    if (context.req && context.req.params) {
      params = context.req.params
    } else {
      const { asPath } = context
      params = getLocationFromPath(asPath)
    }

    let query = {}
    if (context.req && context.req.query) {
      query = context.req.query
    } else if (context.query) {
      query = context.query
    }
    return {
      hideSeparator: true,
      transparentHeader: false,
      newHeader: true,
      query,
      params,
      renderFooter: false,
      headerSearch: true
    }
  }

  componentDidMount() {
    log(LISTING_SEARCH_OPEN)
    window.onpopstate = (event) => {
      const newQuery = getUrlVars(event.state.url)
      this.setState({
        filters: getNewFiltersFromQuery(newQuery)
      })
    }
    Router.events.on('routeChangeComplete', this.handleRouteChange)
  }

  componentWillUnmount() {
    window.onpopstate = null
    Router.events.off('routeChangeComplete', this.handleRouteChange)
  }

  handleRouteChange() {
    // Take action only when neighborhood changes. We do this here because the component
    // responsible for controlling neighborhood filters is not in the same context as
    // this ListingSearch or the ListingFilter.
    let newFilters = getNewFiltersFromQuery(Router.query)
    const newNeighborhoods = newFilters.neighborhoods ? newFilters.neighborhoods.toString() : ''
    const currentNeighborhoods = this.state.filters.neighborhoods ? this.state.filters.neighborhoods.toString() : ''
    if (newNeighborhoods !== currentNeighborhoods) {
      delete newFilters.citiesSlug
      this.setState({
        filters: newFilters
      })
      window.scrollTo(0, 0)
    }
  }

  onChangeFilter = (filters) => {
    // Add neighborhoods to new filters from Router.query
    const neighborhoodFilters = getNewFiltersFromQuery(Router.query).neighborhoods
    filters.neighborhoods = neighborhoodFilters
    const newQuery = treatParams(filters)

    const { params } = this.props
    let route = ''
    if (params && Object.keys(params).length > 0) {
      route = `/${params.state}/${params.city}${params.neighborhood ? `/${params.neighborhood}` : ``}`
    }

    const query = newQuery.length > 0 ? `?${newQuery}` : ''
    Router.push(`/listings${query}`, `/imoveis${route}${query}`, {shallow: true})

    this.setState({filters: filters})
    window.scrollTo(0, 0)
  }

  onResetFilter = () => {
    window.scrollTo(0, 0)
    this.setState({filters: {}})
    Router.push('/listings', '/imoveis', {shallow: true})
  }

  getHead = () => {
    const {params} = this.props
    const {neighborhood} = this.state
    let location = 'na Zona Sul do Rio de Janeiro e em São Paulo'
    let imageSrc = imageUrl('buy.jpg')

    if (neighborhood) {
      location = `em ${neighborhood}, ${params.state === 'rj' ? 'Rio De Janeiro' : 'São Paulo'}`
    } else if (params && params.city === 'rio-de-janeiro') {
      location = 'na Zona Sul do Rio de Janeiro'
    } else if (params && params.city === 'sao-paulo') {
      location = 'na cidade de São Paulo'
    } else if (params && params.state === 'rj') {
      location = 'no Rio de Janeiro'
    } else if (params && params.state === 'sp') {
      location = 'em São Paulo'
    }

    if (params && params.state === 'rj') imageSrc = imageUrl('buy-rj.jpg')
    if (params && params.state === 'sp') imageSrc = imageUrl('buy-sp.jpg')

    return (
      <NextHead
        title={`Apartamentos e Casas à venda ${location} | Emcasa`}
        description={`Conheça em Compre Apartamentos e Casas à venda ${location} com o sistema exclusivo de Tour Virtual 3D do Emcasa, a sua startup imobiliária.`}
        imageSrc={imageSrc}
      />
    )
  }

  render() {
    const {neighborhoods, query, params, user, client} = this.props
    const {filters} = this.state

    if (params && !filters.neighborhoods) {
      if (params.city) {
        filters.citiesSlug = [params.city]
      }
      if (params.neighborhood) {
        filters.neighborhoodsSlugs = [params.neighborhood]
      }
    }

    const listingFilters = getListingFiltersFromState(filters)
    const initialFilters = query ? getDerivedParams(query) : {}

    return (
      <ThemeProvider theme={theme}>
        <>
          {this.getHead()}
          <ListingFilter
            filters={filters}
            neighborhoods={neighborhoods}
            onChange={this.onChangeFilter}
            onReset={this.onResetFilter}
            initialFilters={initialFilters}
          />
          <ListingList
            query={query}
            params={params}
            user={user}
            resetFilters={this.onResetFilter}
            filters={listingFilters}
            apolloClient={client}
            neighborhoodListener={(neighborhood) => {
              if (!this.state.neighborhood) {
                this.setState({neighborhood: neighborhood})
              }
            }}
          />
        </>
      </ThemeProvider>
    )
  }
}

export default ListingSearch
