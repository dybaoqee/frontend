import {Component, Fragment} from 'react'
import Head from 'next/head'
import {redirectIfNotAdmin} from 'lib/auth'
import {getListings} from 'services/listing-api'
import _ from 'lodash'
import Tabs from 'components/shared/Common/Tabs'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import * as colors from 'constants/colors'
import Container, {TabContainer, ChartContainer} from './styles'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  static async getInitialProps(ctx) {
    if (redirectIfNotAdmin(ctx)) {
      return {}
    }
    const listings = await getListings({
      page_size: 400,
      excluded_listing_ids: []
    })

    return {
      listings: listings.data.listings,
      renderFooter: false
    }
  }

  filterListings = (property) =>
    this.props.listings.filter((listing) => !_.isNull(listing[property])).length

  countProperty = (property) =>
    this.props.listings.reduce((prevVal, elem) => prevVal + elem[property], 0)

  getActiveListings = () => {
    const {listings} = this.props
    const total_favorite = this.countProperty('favorite_count')
    const total_visualizations = this.countProperty('visualisations')
    const total_visualizations_tour = this.countProperty('tour_visualisations')
    return (
      <TabContainer>
        <p>
          <span className="highlight">{listings.length}</span> imóveis ativos
        </p>
        <p>
          <span className="highlight">{total_favorite}</span> ações de favoritar
          no total
        </p>
        <p>
          <span className="highlight">{total_visualizations} </span>
          visualizações no total
        </p>
        <p>
          <span className="highlight">{total_visualizations_tour} </span>
          visualizações de Tour 3D no total
        </p>
      </TabContainer>
    )
  }
  getListingsData = () => {
    const listingsWithMaintenanceFee = this.filterListings('maintenance_fee')
    const listingsWithMatterportCode = this.filterListings('matterport_code')
    const listingsWithPropertyTax = this.filterListings('property_tax')
    const listingsWithArea = this.filterListings('area')

    const data = [
      {
        name: 'Condomínio',
        total: listingsWithMaintenanceFee
      },
      {name: 'IPTU', total: listingsWithPropertyTax},
      {
        name: 'Tour Virtual',
        total: listingsWithMatterportCode
      },
      {name: 'Área', total: listingsWithArea}
    ]

    return (
      <ChartContainer>
        <h3>Informações disponíveis nos imóveis</h3>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, this.props.listings.length]} /> />
            <Tooltip />
            <Bar dataKey="total" fill={colors.blue.medium} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    )
  }

  render() {
    const seoImg =
      'https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/home-2018-04-03_cozxd9.jpg'
    const seoTitle = 'EmCasa | Dashboard'
    const seoDescription = 'Painel de administração'

    return (
      <Fragment>
        <Head>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:image" content={seoImg} />
          <meta property="og:image:height" content="838" />
          <meta property="og:image:width" content="1476" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seoTitle} />
          <meta name="twitter:description" content={seoDescription} />
          <meta name="twitter:image" content={seoImg} />
        </Head>
        <Container>
          <Tabs
            full
            tabs={[
              {title: 'Estatísticas', component: this.getActiveListings},
              {title: 'Imóveis', component: this.getListingsData}
            ]}
          />
        </Container>
      </Fragment>
    )
  }
}
