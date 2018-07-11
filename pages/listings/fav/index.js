import {Component, Fragment} from 'react'
import Head from 'next/head'
import {
  getDerivedParams,
  getFiltersFromFilters,
  getFiltersFromQuery
} from 'utils/filter-params.js'
import {getNeighborhoods} from 'services/neighborhood-api'
import Filter from 'components/listings/shared/Search'
import Listings from 'components/listings/fav/Listings'

class FavoriteListings extends Component {
  constructor(props) {
    super(props)

    const filters = getFiltersFromQuery(props.query)

    this.state = {
      mapOpened: false,
      filters
    }
  }

  static async getInitialProps(context) {
    let neighborhoods = []
    neighborhoods = await getNeighborhoods().then(
      ({data}) => data.neighborhoods
    )

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
    this.setState({filters: getFiltersFromFilters(filters)})
    window.scrollTo(0, 0)
  }

  onResetFilter = () => {
    window.scrollTo(0, 0)
    this.setState({filters: {}})
    this.filter.removeFilters()
  }

  getHead = () => {
    const seoImgSrc =
      'https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/home-2018-04-03_cozxd9.jpg'
    const title = 'Imóveis favoritos | EmCasa'
    const description = 'Meus imóveis favoritos'

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
        />
      </Fragment>
    )
  }
}

export default FavoriteListings
