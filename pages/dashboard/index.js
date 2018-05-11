import {Component} from 'react'
import {getJwt, redirectIfNotAdmin, getCurrentUserId} from 'lib/auth'
import {getListings} from 'services/listing-api'
import Layout from 'components/shared/Shell'
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
import {isAuthenticated, isAdmin} from 'lib/auth'
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

    const jwt = getJwt(ctx)

    return {
      listings: listings.data.listings,
      jwt: jwt,
      userId: getCurrentUserId(ctx),
      isAuthenticated: isAuthenticated(ctx),
      isAdmin: isAdmin(ctx)
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
        <h3>Informações disponívels nos imóveis</h3>
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
    const {isAdmin, isAuthenticated} = this.props

    return (
      <Layout authenticated={isAuthenticated} isAdmin={isAdmin}>
        <Container>
          <Tabs
            full
            tabs={[
              {title: 'Estatísticas', component: this.getActiveListings},
              {title: 'Imóveis', component: this.getListingsData}
            ]}
          />
        </Container>
      </Layout>
    )
  }
}
