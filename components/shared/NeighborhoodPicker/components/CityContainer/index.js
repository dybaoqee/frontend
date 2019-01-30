import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import theme from '@emcasa/ui'
import {
  isNeighborhoodSelected
} from '../../selection'
import {
  CitiesWrapper,
  NeighborhoodButton,
  Separator
} from './styles'

const MAX_INITIAL_ITEMS = 3

class CityContainer extends Component {
  render() {
    const {
      cities,
      expand,
      expanded,
      changeSelection,
      selectedNeighborhoods,
      isCitySelected,
      selectCity,
      clear,
      apply,
      parentRef
    } = this.props

    let pos = {}
    if (parentRef) {
      const rects = parentRef.getClientRects()
      if (rects && rects.length > 0) {
        pos = rects[0]
      }
    }
    const topOffset = process.browser && window ? window.scrollY : 0
    return (
      <CitiesWrapper p={2} width={pos.width} top={(pos.top + topOffset)} left={pos.left}>
        {cities.map((city, i) => {
          // Restrict view to only the currently expanded city
          const isExpanded = expanded && expanded.length > 0
          if (isExpanded) {
            if (city.citySlug !== expanded[0].citySlug) {
              return
            }
          }
          let showExpandAll = false
          let isCityExpanded = expanded.includes(city)
          const citySelected = isCitySelected(cities, selectedNeighborhoods, city.citySlug)
          const showSeparator = i <= cities.length - 1
          return (
            <Row key={i} flexDirection="column">
              <Col>
                <Row flexDirection="row" alignItems="center">
                  <Text fontSize="small">{city.name}</Text>
                  {isExpanded && <Button link fontSize={theme.fontSizes[1]} onClick={this.props.showAllCities}>Trocar cidade</Button>}
                </Row>
              </Col>
              <Col>
                <Row flexWrap="wrap">
                  <View mr={2} mb={2}>
                    <NeighborhoodButton
                      active={citySelected}
                      onClick={() => {selectCity(cities, selectedNeighborhoods, city.citySlug)}}>
                        Todos
                      </NeighborhoodButton>
                  </View>
                  {city.neighborhoods.map((neighborhood, j) => {
                    showExpandAll = j > MAX_INITIAL_ITEMS
                    if (!isCityExpanded && j >= MAX_INITIAL_ITEMS) {
                      return null
                    }
                    const isSelected = isNeighborhoodSelected(selectedNeighborhoods, neighborhood.nameSlug)
                    return (
                      <View mr={2} mb={2}>
                        <NeighborhoodButton key={j} active={isSelected} onClick={() => {changeSelection(neighborhood.nameSlug)}}>{neighborhood.name}</NeighborhoodButton>
                      </View>
                    )
                  })}
                  {(showExpandAll && !isCityExpanded) && <Button link onClick={() => {expand(city)}}>Ver mais</Button>}
                </Row>
              </Col>
              {showSeparator && <Col mt={2}><Separator /></Col>}
            </Row>
          )
        })}
        <Row justifyContent="space-between">
          <Button p={0} link color="dark" onClick={clear}>Limpar</Button>
          <Button p={0} link onClick={apply}>{this.props.fromHome ? 'Pesquisar' : 'Aplicar'}</Button>
        </Row>
      </CitiesWrapper>
    )
  }
}

CityContainer.propTypes = {
  cities: PropTypes.array.isRequired,
  expand: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  changeSelection: PropTypes.func.isRequired,
  selectedNeighborhoods: PropTypes.func.isRequired,
  selectCity: PropTypes.func.isRequired,
  isCitySelected: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  apply: PropTypes.func.isRequired,
  parentRef: PropTypes.object.isRequired,
  fromHome: PropTypes.bool,
  showAllCities: PropTypes.func.isRequired
}

export default CityContainer
