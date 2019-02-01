import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PoseGroup } from 'react-pose'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'
import theme from '@emcasa/ui'
import {
  isNeighborhoodSelected,
  updateSelection
} from '../../selection'
import {
  CitiesWrapper,
  NeighborhoodButton,
  Separator
} from './styles'
import { Animated } from '../../styles'

const MAX_INITIAL_ITEMS = 3

class CityContainer extends Component {
  constructor(props) {
    super(props)
    this.updateCurrentSelection = this.updateCurrentSelection.bind(this)
    this.state = {
      currentSelection: []
    }
  }

  getNeighborhoodButton(key, isSelected, isNewSelection, changeSelection, neighborhood) {
    return (
      <View mr={2} mb={2}>
        <NeighborhoodButton key={key} active={isSelected || isNewSelection} onClick={() => {changeSelection(neighborhood.nameSlug)}}>{neighborhood.name}</NeighborhoodButton>
      </View>
    )
  }

  updateCurrentSelection(neighborhood) {
    const newSelection = updateSelection(this.state.currentSelection, neighborhood)
    this.setState({ currentSelection: newSelection })
  }

  render() {
    const {
      cities,
      expand,
      expanded,
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
      <CitiesWrapper
        p={2}
        width={pos.width}
        top={(pos.top + topOffset)}
        left={pos.left}
        fromHome={this.props.fromHome}
        fullscreen={this.props.fullscreen}
      >
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
          const citySelected = isCitySelected(cities, this.state.currentSelection, city.citySlug)
          const showSeparator = i <= cities.length - 1

          const selectedNeighborhoodList = []
          const deselectedNeighborhoodList = []
          city.neighborhoods.forEach((neighborhood, j) => {
            const isSelected = isNeighborhoodSelected(selectedNeighborhoods, neighborhood.nameSlug)
            const isNewSelection = isNeighborhoodSelected(this.state.currentSelection, neighborhood.nameSlug)
            if (isSelected) {
              selectedNeighborhoodList.push(this.getNeighborhoodButton(j, isSelected, isNewSelection, this.updateCurrentSelection, neighborhood))
            } else {
              deselectedNeighborhoodList.push(this.getNeighborhoodButton(j, isSelected, isNewSelection, this.updateCurrentSelection, neighborhood))
            }
          })
          let buttonsRendered = 0

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
                      onClick={() => {selectCity(cities, this.state.currentSelection, city.citySlug)}}>
                        Todos
                      </NeighborhoodButton>
                  </View>
                  <PoseGroup>
                    {selectedNeighborhoodList.map((Item) => {
                      buttonsRendered++
                      showExpandAll = buttonsRendered > MAX_INITIAL_ITEMS
                      if (!isCityExpanded && buttonsRendered >= MAX_INITIAL_ITEMS) {
                        return null
                      }
                      return <Animated key={buttonsRendered * 1000}>{Item}</Animated>
                    })}
                    {deselectedNeighborhoodList.map((Item) => {
                      buttonsRendered++
                      showExpandAll = buttonsRendered > MAX_INITIAL_ITEMS
                      if (!isCityExpanded && buttonsRendered >= MAX_INITIAL_ITEMS) {
                        return null
                      }
                      return <Animated key={buttonsRendered}>{Item}</Animated>
                    })}
                  </PoseGroup>
                  {(showExpandAll && !isCityExpanded) && <Button p={0} link onClick={() => {expand(city)}}>Ver mais</Button>}
                </Row>
              </Col>
              {showSeparator && <Col mt={2}><Separator /></Col>}
            </Row>
          )
        })}
        <Row justifyContent="space-between">
          <Button p={0} link color="dark" onClick={clear}>Limpar</Button>
          <Button p={0} link onClick={() => {apply(this.state.currentSelection)}}>{this.props.fromHome ? 'Pesquisar' : 'Aplicar'}</Button>
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
  showAllCities: PropTypes.func.isRequired,
  fromHome: PropTypes.bool,
  fullscreen: PropTypes.bool
}

export default CityContainer
