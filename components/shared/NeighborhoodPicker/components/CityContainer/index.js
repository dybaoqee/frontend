import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import {
  CitiesWrapper
} from './styles'

class CityContainer extends Component {
  render() {
    const { cities } = this.props
    console.log(cities)
    return (
      <CitiesWrapper>
        {cities.map((city, i) =>
          <Row key={i} p={2} flexDirection="column">
            <Col><Text fontSize="small">{city.name}</Text></Col>
            <Col>
              <Row flexWrap="wrap">
                {city.neighborhoods.map((neighborhood, j) =>
                  <View mr={2} mb={2}>
                    <Button key={j}>{neighborhood.name}</Button>
                  </View>
                )}
                <Button link>Ver todos</Button>
              </Row>
            </Col>
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
