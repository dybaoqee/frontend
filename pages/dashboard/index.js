import {Component, Fragment} from 'react'
import Head from 'next/head'
import {redirectIfNotAdmin} from 'lib/auth'
import Tabs from 'components/shared/Common/Tabs'
import {Query} from 'react-apollo'
import {GET_DASHBOARD_STATS} from 'graphql/admin/queries'
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

    return {
      renderFooter: false
    }
  }

  getActiveListings = ({
    activeListingCount,
    favoriteCount,
    tourVisualizationCount,
    visualizationCount
  }) => {
    return (
      <TabContainer>
        <p>
          <span className="highlight">{activeListingCount}</span> imóveis ativos
        </p>
        <p>
          <span className="highlight">{favoriteCount}</span> ações de favoritar
          no total
        </p>
        <p>
          <span className="highlight">{visualizationCount} </span>
          visualizações no total
        </p>
        <p>
          <span className="highlight">{tourVisualizationCount} </span>
          visualizações de Tour 3D no total
        </p>
      </TabContainer>
    )
  }
  getListingsData = ({
    activeListingCount,
    areaCount,
    maintenanceFeeCount,
    propertyTaxCount,
    tourCount
  }) => {
    const data = [
      {
        name: 'Condomínio',
        total: maintenanceFeeCount
      },
      {name: 'IPTU', total: propertyTaxCount},
      {
        name: 'Tour Virtual',
        total: tourCount
      },
      {name: 'Área', total: areaCount}
    ]

    return (
      <ChartContainer>
        <h3>Informações disponíveis nos imóveis</h3>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, activeListingCount]} /> />
            <Tooltip />
            <Bar dataKey="total" fill={colors.blue.medium} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    )
  }

  render() {
    const seoImg =
      'https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/home-2018-04-03_cozxd9'
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
        <Query query={GET_DASHBOARD_STATS}>
          {({data: {dashboard}, loading}) => {
            if (loading)
              return (
                <Container>
                  <p>Carregando...</p>
                </Container>
              )
            return (
              <Container>
                <Tabs
                  full
                  tabs={[
                    {
                      title: 'Estatísticas',
                      component: this.getActiveListings.bind(this, dashboard)
                    },
                    {
                      title: 'Imóveis',
                      component: this.getListingsData.bind(this, dashboard)
                    }
                  ]}
                />
              </Container>
            )
          }}
        </Query>
      </Fragment>
    )
  }
}
