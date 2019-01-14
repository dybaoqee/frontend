import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { clone } from 'utils/clone'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import {
  CitiesWrapper
} from './styles'

class CityContainer extends Component {
  constructor(props) {
    super(props)
    this.selectNeighborhood = this.selectNeighborhood.bind(this)

    this.state = {
      selected: []
    }
  }

  selectNeighborhood(neighborhood) {
    let selectedNeighborhoods = clone(this.state.selected)
    if (selectedNeighborhoods.includes(neighborhood.nameSlug)) {
      selectedNeighborhoods = selectedNeighborhoods.filter((slug) => slug !== neighborhood.nameSlug)
    } else {
      selectedNeighborhoods.push(neighborhood.nameSlug)
    }
    this.setState({
      selected: selectedNeighborhoods
    })
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
                    <Button key={j} onClick={() => {this.selectNeighborhood(neighborhood)}}>{neighborhood.name}</Button>
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
