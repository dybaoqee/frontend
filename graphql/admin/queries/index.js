import gql from 'graphql-tag'

export const GET_DASHBOARD_STATS = gql`
  {
    dashboard {
      activeListingCount
      areaCount
      favoriteCount
      maintenanceFeeCount
      propertyTaxCount
      tourCount
      tourVisualizationCount
      visualizationCount
    }
  }
`
