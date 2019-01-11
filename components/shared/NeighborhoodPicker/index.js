import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/browser'
import Text from '@emcasa/ui-dom/components/Text'
import { GET_DISTRICTS } from 'graphql/listings/queries'
import { cities } from 'constants/cities'

class NeighborhoodPicker extends Component {
  constructor(props) {
    super(props)
    this.getCities = this.getCities.bind(this)

    this.state = {
      cities: []
    }
  }

  componentWillMount() {
    this.getCities()
  }

  async getCities() {
    try {
      const { data } = await apolloClient.query({
        query: GET_DISTRICTS
      })
      if (data) {
        let citiesNeighborhoods = cities
        data.districts.forEach((item) => {
          citiesNeighborhoods.find((city) => city.citySlug === item.citySlug).neighborhoods.push(item)
        })
        this.setState({cities: citiesNeighborhoods})
      }
    } catch (e) {
      Sentry.captureException(e)
    }
  }

  render() {
    return (
      null
    )
  }
}

export default NeighborhoodPicker
