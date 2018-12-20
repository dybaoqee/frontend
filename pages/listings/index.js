import '@emcasa/ui-dom/components/global-styles'
import {Component} from 'react'
import {ThemeProvider} from 'styled-components'
import theme from '@emcasa/ui'
import Head from 'next/head'
import Router from 'next/router'
import {
  treatParams,
  getDerivedParams,
  getNewFiltersFromFilters,
  getNewFiltersFromQuery
} from 'utils/filter-params.js'
import ListingFilter from 'components/listings/shared/ListingFilter'
import ListingList from 'components/listings/shared/ListingList'
import {getUrlVars} from 'utils/text-utils'

class ListingSearch extends Component {
  constructor(props) {
    super(props)
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
    const params = (context.req && context.req.params) ? context.req.params : {}
    const query = (context.req && context.req.query) ? context.req.query : {}
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
    require('utils/polyfills/smooth-scroll').load()

    window.onpopstate = (event) => {
      const newQuery = getUrlVars(event.state.url)
      this.setState({
        filters: getNewFiltersFromQuery(newQuery)
      })
    }
  }

  componentWillUnmount() {
    window.onpopstate = null
  }

  onChangeFilter = (filters) => {
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
    const {neighborhood} = this.state
    const {query} = this.props
    const fullCity = query && query.state === 'rj' ? 'na Zona Sul do Rio de Janeiro' : 'em São Paulo'
    const city = query && query.state === 'rj' ? 'Rio De Janeiro' : 'São Paulo'

    const seoImgSrc =
      'https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/home-2018-04-03_cozxd9.jpg'
    const title = !neighborhood
      ? `Apartamentos e Casas à venda ${fullCity} | EmCasa`
      : `Apartamentos e Casas à venda - ${neighborhood}, ${city} | EmCasa`
    const description = !neighborhood
      ? `Conheça em Compre Apartamentos e Casas à venda ${fullCity} com o sistema exclusivo de Tour 3D da EmCasa`
      : `Conheça em Compre Apartamentos e Casas à venda - ${neighborhood}, ${city} com o sistema exclusivo de Tour 3D da EmCasa`

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

  render() {
    const {neighborhoods, query, params, user, client} = this.props
    const {filters} = this.state

    if (params) {
      if (params.city) {
        filters.citiesSlug = [params.city]
      }
      if (params.neighborhood) {
        filters.neighborhoodsSlugs = [params.neighborhood]
      }
    }

    const listingFilters = getNewFiltersFromFilters(filters)
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
