import React, { PureComponent } from 'react'
import { GET_DISTRICTS } from 'graphql/listings/queries'
import { Query } from 'react-apollo'
import { cities } from 'constants/cities'

class NeighborhoodQuery extends PureComponent {
  render() {
    return (
      <Query query={GET_DISTRICTS}>
        {({data: {districts}, loading}) => {
          if (loading) {
            return null
          }

          let citiesNeighborhoods = cities
          districts.forEach((item) => {
            citiesNeighborhoods.find((city) => city.citySlug === item.citySlug).neighborhoods.push(item)
          })

          console.log(citiesNeighborhoods)
          return null
        }}
      </Query>
    )
  }
}

export default NeighborhoodQuery
