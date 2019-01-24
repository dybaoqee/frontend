import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import enhanceWithClickOutside from 'react-click-outside'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import AngleDown from '@fortawesome/fontawesome-pro-light/faAngleDown'
import AngleUp from '@fortawesome/fontawesome-pro-light/faAngleUp'
import * as Sentry from '@sentry/browser'
import Icon from '@emcasa/ui-dom/components/Icon'
import Col from '@emcasa/ui-dom/components/Col'
import CityContainer from './components/CityContainer'
import { GET_DISTRICTS } from 'graphql/listings/queries'
import { Query } from 'react-apollo'
import { cities } from 'constants/cities'
import { arrayToString } from 'utils/text-utils'
import {
  addNeighborhoodsToQuery,
  getDerivedParams
} from 'utils/filter-params.js'
import {
  updateSelection
} from './selection'
import {
  InputWrapper,
  InputContainer,
  SearchContainer,
  SearchTextContainer,
  BackIcon,
  BackButton,
  ButtonText
} from './styles'

const DEFAULT_BUTTON_TEXT = 'Escolha os bairros'

class NeighborhoodPicker extends Component {
  constructor(props) {
    super(props)
    this.getCities = this.getCities.bind(this)
    this.toggleCitiesDisplay = this.toggleCitiesDisplay.bind(this)
    this.changeSelection = this.changeSelection.bind(this)
    this.expand = this.expand.bind(this)
    this.clear = this.clear.bind(this)
    this.apply = this.apply.bind(this)
    this.getButtonText = this.getButtonText.bind(this)

    const initialNeighborhoodSelection = props.query && props.query.bairros ? getDerivedParams(props.query).neighborhoods : []

    this.state = {
      selectedNeighborhoods: initialNeighborhoodSelection,
      expanded: [],
      showCities: this.props.mobile
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
    this.setState({selectedNeighborhoods: []}, () => {
      this.apply()
    })
  }

  apply() {
    this.toggleCitiesDisplay()
    if (this.props.onBackPressed) {
      this.props.onBackPressed()
    }
    const query = addNeighborhoodsToQuery(getDerivedParams(this.props.query), this.state.selectedNeighborhoods)
    Router.push(`/listings${query}`, `/imoveis${query}`, {shallow: true})
  }

  changeSelection(neighborhood) {
    const newSelection = updateSelection(this.state.selectedNeighborhoods, neighborhood)
    this.setState({ selectedNeighborhoods: newSelection })
  }

  handleClickOutside() {
    if (this.state.showCities) {
      this.toggleCitiesDisplay()
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

  toggleCitiesDisplay() {
    this.setState({showCities: !this.state.showCities})
  }

  getButtonText() {
    if (process.browser) {
      const selected = getDerivedParams(Router.query).neighborhoods
      if (selected && selected.length > 0) {
        return arrayToString(selected)
      }
    }
    return DEFAULT_BUTTON_TEXT
  }

  render() {
    return (
      <Query query={GET_DISTRICTS} ssr={true}>
        {({data}) => {
          const availableCities = this.getCities(data)
          return (
            <SearchContainer onClick={this.props.onClick} mobile={this.props.mobile}>
              <InputWrapper>
                <InputContainer onClick={this.toggleCitiesDisplay} selected={this.state.showCities}>
                  <SearchTextContainer>
                    {this.props.onBackPressed ?
                      <BackButton onClick={this.props.onBackPressed}>
                        <BackIcon name="arrow-left" color="dark" />
                      </BackButton>
                      :
                      <Icon name="map-marker-alt" px={3} pt={1} size={21} color="dark" />
                    }
                    <ButtonText color="grey">{this.getButtonText()}</ButtonText>
                  </SearchTextContainer>
                  <Col px={3} pt={1}>
                    <FontAwesomeIcon icon={this.state.showCities ? AngleUp : AngleDown} size="2x" style={{fontSize: 24}} />
                  </Col>
                </InputContainer>
              </InputWrapper>
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
  onClick: PropTypes.func.isRequired,
  onBackPressed: PropTypes.func,
  mobile: PropTypes.bool,
  query: PropTypes.object.isRequired
}

export default enhanceWithClickOutside(NeighborhoodPicker)
