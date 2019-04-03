import {Component, Fragment} from 'react'
import NextHead from 'components/shared/NextHead'
import Router from 'next/router'
import {
  treatParams,
  getListingFiltersFromState,
  getNewFiltersFromQuery,
  getLocationFromPath
} from 'utils/filter-params.js'
import ListingFilter from 'components/listings/shared/ListingFilter'
import ListingList from 'components/listings/shared/ListingList'
import {getUrlVars} from 'utils/text-utils'
import {imageUrl} from 'utils/image_url'
import {log, LISTING_SEARCH_OPEN} from 'lib/logging'
import {
  getTitleTextByFilters,
  getTitleTextByParams
} from 'components/listings/shared/ListingList/title'
import {
  SchemaWebSite,
  SchemaRealEstateAgent,
  SchemaOrganization
} from 'constants/ld-json'
import {Query} from 'react-apollo'
import {GET_DISTRICTS} from 'graphql/listings/queries'

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
      const {asPath} = context
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
    const newNeighborhoods = newFilters.neighborhoods
      ? newFilters.neighborhoods.toString()
      : ''
    const currentNeighborhoods = this.state.filters.neighborhoods
      ? this.state.filters.neighborhoods.toString()
      : ''
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
    const neighborhoodFilters = getNewFiltersFromQuery(Router.query)
      .neighborhoods
    filters.neighborhoods = neighborhoodFilters
    const newQuery = treatParams(filters)

    const {params} = this.props
    let route = ''
    if (params && Object.keys(params).length > 0) {
      route = `/${params.state}/${params.city}${
        params.neighborhood ? `/${params.neighborhood}` : ''
      }`
    }

    const query = newQuery.length > 0 ? `?${newQuery}` : ''
    Router.push(`/listings${query}`, `/imoveis${route}${query}`, {
      shallow: true
    })

    this.setState({filters: filters})
    window.scrollTo(0, 0)
  }

  onResetFilter = () => {
    window.scrollTo(0, 0)
    this.setState({filters: {}})
    Router.push('/listings', '/imoveis', {shallow: true})
  }

  getCanonical = (districts) => {
    const {filters} = this.state
    const info =
      filters && filters.neighborhoods
        ? districts.find((a) => a.nameSlug === filters.neighborhoods[0])
        : null

    return info && info.stateSlug
      ? `/${info.stateSlug}/${info.citySlug}/${info.nameSlug}`
      : `${BASE_URL}`
  }

  getURL = () => {
    const {params, url: {asPath}} = this.props
    const {state, city, neighborhood} = params
    const startParams = asPath.indexOf('?')
    const urlParams =
      startParams && startParams != -1
        ? asPath.slice(startParams, asPath.length)
        : ''
    let url = BASE_URL

    if (neighborhood) {
      url += `/${state}/${city}/${neighborhood}`
    } else if (city) {
      url += `/${state}/${city}`
    } else if (state) {
      url += `/${state}`
    }

    return (url += urlParams)
  }

  getImageSrc = () => {
    const {params: {state}} = this.props
    let imgSrc = state ? `buy-${state}` : 'buy'

    return imageUrl(imgSrc)
  }

  getHead = (districts) => {
    const {filters} = this.state
    const {params} = this.props
    const titleContent =
      filters && filters.neighborhoods
        ? getTitleTextByFilters(filters.neighborhoods, districts)
        : getTitleTextByParams(params, districts)
    const url = this.getURL()
    const canonical =
      filters.neighborhoods && filters.neighborhoods.length === 1
        ? this.getCanonical(districts)
        : null
    const imageSrc = this.getImageSrc()

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

  getWebPage = () => {
    let schema = {
      '@context': 'http://schema.org',
      '@type': 'WebPage',
      '@id': 'https://www.emcasa.com/imoveis/#webpage',
      url: 'https://www.emcasa.com/imoveis',
      name:
        'Apartamentos e Casas à venda na Zona Sul do Rio de Janeiro e em São Paulo',
      description:
        'Conheça em Compre Apartamentos e Casas à venda na Zona Sul do Rio de Janeiro e em São Paulo com o sistema exclusivo de Tour Virtual 3D do Emcasa, a sua startup imobiliária.',
      breadcrumb: this.getBreadcrumbList()
    }

    return schema
  }

  getBreadcrumbList = () => {
    let itemListElement = [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': 'http://www.emcasa.com',
          url: 'http://www.emcasa.com',
          name: 'Página Inicial'
        }
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': 'http://www.emcasa.com/imoveis',
          url: 'http://www.emcasa.com/imoveis',
          name: 'Comprar imóvel'
        }
      }
    ]

    return {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: itemListElement
    }
  }

  render() {
    const {query, params, user, client} = this.props
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

    return (
      <Query query={GET_DISTRICTS}>
        {({data, loading, error}) => {
          if (loading) return <div />
          if (error) return <p>ERROR</p>
          const districts = data ? data.districts : []
          return (
            <Fragment>
              {this.getHead(districts)}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(SchemaWebSite)
                }}
              />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(SchemaRealEstateAgent)
                }}
              />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(SchemaOrganization)
                }}
              />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(this.getWebPage())
                }}
              />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(this.getBreadcrumbList())
                }}
              />
              <ListingFilter onSubmit={this.onChangeFilter} values={filters} />
              <ListingList
                query={query}
                params={params}
                user={user}
                resetFilters={this.onResetFilter}
                filters={listingFilters}
                apolloClient={client}
                districts={districts}
                neighborhoodListener={(neighborhood) => {
                  if (!this.state.neighborhood) {
                    this.setState({neighborhood: neighborhood})
                  }
                }}
              />
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default ListingSearch
