import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import { updateSelection } from './selection'
import {
  CitiesWrapper
} from './styles'

class CityContainer extends Component {
  constructor(props) {
    super(props)
    this.changeSelection = this.changeSelection.bind(this)

    this.state = {
      selected: []
    }
  }

  changeSelection(neighborhood) {
    const newSelection = updateSelection(this.state.selected, neighborhood)
    this.setState({ selected: newSelection })
  }

  render() {
    const { cities } = this.props
    return (
      <CitiesWrapper p={2}>
        {cities.map((city, i) =>
          <Row key={i} flexDirection="column">
            <Col><Text fontSize="small">{city.name}</Text></Col>
            <Col>
              <Row flexWrap="wrap">
                {city.neighborhoods.map((neighborhood, j) =>
                  <View mr={2} mb={2}>
                    <Button key={j} onClick={() => {this.changeSelection(neighborhood.nameSlug)}}>{neighborhood.name}</Button>
                  </View>
                )}
                <Button link>Ver todos</Button>
              </Row>
            </Col>
          </Row>
        )}
        <Row justifyContent="space-between">
          <Button>Limpar</Button>
          <Button>Aplicar</Button>
        </Row>
      </CitiesWrapper>
    )
  }
}

CityContainer.propTypes = {
  cities: PropTypes.array.isRequired
}

export default CityContainer
