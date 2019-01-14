import React, { Component } from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'
import * as Sentry from '@sentry/browser'
import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'
import Icon from '@emcasa/ui-dom/components/Icon'
import Col from '@emcasa/ui-dom/components/Col'
import CityContainer from './components/CityContainer'
import { GET_DISTRICTS } from 'graphql/listings/queries'
import { cities } from 'constants/cities'
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

    this.state = {
      cities: [],
      showCities: false
    }
  }

  componentWillMount() {
    this.getCities()
  }

  handleClickOutside() {
    if (this.state.showCities) {
      this.toggleCities()
    }
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

  toggleCities() {
    this.setState({showCities: !this.state.showCities})
  }

  render() {
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
        {this.state.showCities && <CityContainer cities={this.state.cities} onSelect={this.onSelect} />}
      </SearchContainer>
    )
  }
}

NeighborhoodPicker.propTypes = {

}

export default enhanceWithClickOutside(NeighborhoodPicker)
