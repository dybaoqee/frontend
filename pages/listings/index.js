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
} from 'lib/amplitude'
import {
  getTitleTextByFilters,
  getTitleTextByParams
} from 'components/listings/shared/ListingList/title'
import {NEIGHBORHOODS} from 'constants/listing-locations'

const BASE_URL = 'https://www.emcasa.com/imoveis'

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

  getCanonical = (neighborhoodsSlugs) => {
    const {state, city, neighborhood} = NEIGHBORHOODS.find(value => value.neighborhood === neighborhoodsSlugs[0])
    return state ? `/${state}/${city}/${neighborhood}` : null
  }

  getURL = (params) => {
    const {state, city, neighborhood} = params
    if (neighborhood) {
      return `/${state}/${city}/${neighborhood}`
    } else if (city) {
      return `/${state}/${city}`
    } else {
      return `/${state}`
    }
  }

  getImageSrc = (params) => {
    const {state} = params
    let imgSrc = state ? `buy-${state}.jpg` : 'buy.jpg'

    return imageUrl(imgSrc)
  }

  getHead = () => {
    const {filters} = this.state
    const {params} = this.props
    const titleContent = filters && filters.neighborhoods ? getTitleTextByFilters(filters.neighborhoods) : getTitleTextByParams(params)
    const url = params && params.state ? this.getURL(params) : BASE_URL
    const canonical = filters.neighborhoods && filters.neighborhoods.length === 1 ? `${BASE_URL}${this.getCanonical(filters.neighborhoods)}` : null
    const imageSrc = this.getImageSrc(params)

    return (
      <NextHead
        title={`${titleContent} | Emcasa`}
        description={`Conheça em Compre Apartamentos e Casas à venda ${titleContent} com o sistema exclusivo de Tour Virtual 3D do Emcasa, a sua startup imobiliária.`}
        imageSrc={imageSrc}
        url={url}
        canonical={canonical}

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
        filters.neighborhoods = [params.neighborhood]
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
