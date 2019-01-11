import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import {
  CitiesWrapper
} from './styles'

class CityContainer extends Component {
  render() {
    const { cities } = this.props
    return (
      <CitiesWrapper>
        {cities.map((city) =>
          <Row>
            <Text size="small">{city.name}</Text>
          </Row>
        )}
      </CitiesWrapper>
    )
  }
}

CityContainer.propTypes = {
  cities: PropTypes.array.isRequired
}

export default CityContainer
