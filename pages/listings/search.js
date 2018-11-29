import {Component, Fragment} from 'react'
import Head from 'next/head'
import Router from 'next/router'
import {
  treatParams,
  getDerivedParams,
  getFiltersFromFilters,
  getFiltersFromQuery
} from 'utils/filter-params.js'
import Filter from 'components/listings/shared/Search'
import Listings from 'components/listings/shared/Listings'
import {getUrlVars} from 'utils/text-utils'

class ListingSearch extends Component {
  constructor(props) {
    super(props)

    const filters = getFiltersFromQuery(props.query)

    this.state = {
      mapOpened: false,
      filters,
      neighborhood: null
    }
  }

  static async getInitialProps(context) {
    return {
      shortLogo: true,
      hideSeparator: true,
      transparentHeader: true,
      query: context.query,
      renderFooter: false
    }
  }

  componentDidMount() {
    require('utils/polyfills/smooth-scroll').load()

    window.onpopstate = (event) => {
      const newQuery = getUrlVars(event.state.url)
      this.setState({
        filters: getFiltersFromQuery(newQuery)
      })

      this.filter.setFilters(getDerivedParams(newQuery))
    }
  }

  componentWillUnmount() {
    window.onpopstate = null
  }

  onChangeFilter = (filters) => {
    const newQuery = treatParams(filters)

    const query = newQuery.length > 0 ? `?${newQuery}` : ''
    Router.push(`/listings${query}`, `/imoveis${query}`, {
      shallow: true
    })
    this.setState({
      filters: getFiltersFromFilters(filters)
    })
    window.scrollTo(0, 0)
  }

  onResetFilter = () => {
    window.scrollTo(0, 0)
    this.setState({filters: {}})
    this.filter.removeFilters()
    Router.push('/listings', '/imoveis', {shallow: true})
  }

  getHead = () => {
    const {query} = this.props
    const {neighborhood} = this.state
    const seoImgSrc =
      'https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/home-2018-04-03_cozxd9.jpg'
    const title = !neighborhood
      ? 'Apartamentos e Casas à venda na Zona Sul do Rio de Janeiro | EmCasa'
      : `Apartamentos e Casas à venda - ${neighborhood}, Rio de Janeiro | EmCasa`
    const description = !neighborhood
      ? 'Conheça em Compre Apartamentos e Casas à venda na Zona Sul do Rio de Janeiro com o sistema exclusivo de Tour 3D da EmCasa'
      : `Conheça em Compre Apartamentos e Casas à venda - ${neighborhood}, Zona Sul do Rio de Janeiro com o sistema exclusivo de Tour 3D da EmCasa`

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
    const {neighborhoods, query, user, client} = this.props
    const {filters} = this.state

    const hasFilters = Object.keys(filters).length > 0
    if (!hasFilters && query.neighborhoodSlug) {
      filters.neighborhoodsSlugs = [query.neighborhoodSlug]
    }

    return (
      <Fragment>
        {this.getHead()}

        <Filter
          neighborhoods={neighborhoods}
          onChange={this.onChangeFilter}
          onReset={this.onResetFilter}
          initialFilters={getDerivedParams(query)}
          ref={(filter) => (this.filter = filter)}
        />
        <Listings
          query={query}
          user={user}
          resetFilters={this.onResetFilter}
          filters={filters}
          apolloClient={client}
          neighborhoodListener={(neighborhood) => {
            if (!this.state.neighborhood) {
              this.setState({neighborhood: neighborhood})
            }
          }}
        />
      </Fragment>
    )
  }
}

export default ListingSearch
