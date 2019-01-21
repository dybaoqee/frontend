import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import enhanceWithClickOutside from 'react-click-outside'
import * as Sentry from '@sentry/browser'
import Text from '@emcasa/ui-dom/components/Text'
import Icon from '@emcasa/ui-dom/components/Icon'
import Col from '@emcasa/ui-dom/components/Col'
import CityContainer from './components/CityContainer'
import { GET_DISTRICTS } from 'graphql/listings/queries'
import { Query } from 'react-apollo'
import { cities } from 'constants/cities'
import {
  addNeighborhoodsToQuery,
  getDerivedParams
} from 'utils/filter-params.js'
import {
  updateSelection
} from './selection'
import {
  InputContainer,
  SearchContainer,
  SearchTextContainer
} from './styles'

class NeighborhoodPicker extends Component {
  constructor(props) {
    super(props)
    this.getCities = this.getCities.bind(this)
    this.toggleCities = this.toggleCities.bind(this)
    this.changeSelection = this.changeSelection.bind(this)
    this.expand = this.expand.bind(this)
    this.clear = this.clear.bind(this)
    this.apply = this.apply.bind(this)

    this.state = {
      selectedNeighborhoods: [],
      expanded: [],
      showCities: false
    }
  }

  expand(city) {
    let newExpanded = this.state.expanded
    newExpanded.push(city)
    this.setState({
      expanded: newExpanded
    })
  }

  clear() {
    this.setState({selectedNeighborhoods: []})
  }

  apply() {
    this.toggleCities()
    const query = addNeighborhoodsToQuery(getDerivedParams(this.props.query), this.state.selectedNeighborhoods)
    Router.push(`/listings${query}`, `/imoveis${query}`, {shallow: true})
  }

  changeSelection(neighborhood) {
    const newSelection = updateSelection(this.state.selectedNeighborhoods, neighborhood)
    this.setState({ selectedNeighborhoods: newSelection })
  }

  handleClickOutside() {
    if (this.state.showCities) {
      this.toggleCities()
    }
  }

  getCities(data) {
    try {
      if (data) {
        let citiesNeighborhoods = cities
        citiesNeighborhoods.forEach((city) => city.neighborhoods = [])
        data.districts.forEach((item) => {
          citiesNeighborhoods.find((city) => city.citySlug === item.citySlug).neighborhoods.push(item)
        })
        return citiesNeighborhoods
      }
    } catch (e) {
      Sentry.captureException(e)
    }
  }

  toggleCities() {
    this.setState({showCities: !this.state.showCities})
  }

  render() {
    return (
      <Query query={GET_DISTRICTS} ssr={true}>
        {({data}) => {
          const availableCities = this.getCities(data)
          return (
            <SearchContainer>
              <Col width={1} style={{zIndex: 1}}>
                <InputContainer onClick={this.toggleCities} selected={this.state.showCities}>
                  <SearchTextContainer>
                    <Icon name="map-marker-alt" px={3} pt={1} size={21} /><Text color="grey">Selecione os bairros desejados</Text>
                  </SearchTextContainer>
                  <Col px={3} pt={1}>
                    <Icon name={this.state.showCities ? 'angle-up' : 'angle-down'} />
                  </Col>
                </InputContainer>
              </Col>
              {this.state.showCities &&
                <CityContainer
                  cities={availableCities}
                  selectedNeighborhoods={this.state.selectedNeighborhoods}
                  expanded={this.state.expanded}
                  changeSelection={this.changeSelection}
                  expand={this.expand}
                  clear={this.clear}
                  apply={this.apply}
                />}
            </SearchContainer>
          )
        }}
      </Query>
    )
  }
}

NeighborhoodPicker.propTypes = {
  query: PropTypes.object.isRequired
}

export default enhanceWithClickOutside(NeighborhoodPicker)
