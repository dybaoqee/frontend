import {Component} from 'react'
import includes from 'lodash/includes'
import remove from 'lodash/remove'
import numeral from 'numeral'
import NewSlider from 'components/shared/Common/NewSlider'
import {neighborhoodOptions} from 'constants/listing-filter-options'
import {Query} from 'react-apollo'
import {GET_NEIGHBORHOODS} from 'graphql/listings/queries'
import FilterPanel from './components/FilterPanel'
import FilterButton from './components/FilterButton'
import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'
import { clone } from 'utils/clone'
import {
  Overlay
} from './styles'

import {
  MIN_GROUP_FILTER_VALUE,
  MAX_GROUP_FILTER_VALUE,
  MAX_GROUP_ITEMS_SELECTION,
  FILTERS,
  AREA_FILTER,
  PRICE_FILTER
} from './constants'

export default class Filter extends Component {
  constructor(props) {
    super(props)
    this.isFilterOpen = this.isFilterOpen.bind(this)
    this.hideAllFilters = this.hideAllFilters.bind(this)
    this.applyFilters = this.applyFilters.bind(this)
    this.restorePreviousValues = this.restorePreviousValues.bind(this)

    const initialValues = {...props.initialFilters}
    if (props.initialFilters.neighborhoods) {
      initialValues.neighborhoods = props.initialFilters.neighborhoods.map(
        (neighborhood) => ({
          value: neighborhood,
          label: neighborhood
        })
      )
    }

    this.state = {
      values: clone(initialValues),
      previousValues: clone(initialValues),
      showType: false,
      showArea: false,
      showPrice: false,
      showRooms: false,
      showGarage: false,
      panelPosition: null
    }
  }

  sliderChanged = (value, {minValue, maxValue}, userClicked) => {
    if (userClicked) {
      let updatedValues = clone(this.state.values)
      if (!updatedValues[value]) {
        updatedValues[value] = {}
      }
      updatedValues[value].min = minValue
      updatedValues[value].max = maxValue
      this.setState({values: updatedValues})
    }
  }

  neighborhoodChanged = (neighborhoods) => {
    let updatedValues = clone(this.state.values)
    updatedValues.neighborhoods = neighborhoods
    this.props.onChange(updatedValues)
    this.setState({values: updatedValues})
  }

  onChangeListingType = (listingType) => {
    let updatedValues = clone(this.state.values)
    updatedValues.types = updatedValues.types || []

    if (!includes(updatedValues.types, listingType)) {
      updatedValues.types.push(listingType)
    } else {
      remove(updatedValues.types, (item) => item === listingType)
    }

    this.setState({values: updatedValues})
  }

  resetFilter = (filter) => {
    let updatedValues = clone(this.state.values)
    delete updatedValues[filter]
    this.setState({
      values: updatedValues,
      previousValues: updatedValues
    })
    this.hideAllFilters()
    this.props.onChange(updatedValues)
  }

  resetFilters = () => {
    const {onReset} = this.props
    this.setState({values: {}})
    onReset && onReset()
  }

  removeFilters = () => {
    this.setState({values: {}})
  }

  activeFilters(values) {
    const { types, price, neighborhoods, rooms, garageSpots, area } = values

    const propertyTypes = types && types.join(', ')
    const rangePrice =
      price &&
      `R$${numeral(price.min).format('0.00a')} - R$${numeral(price.max).format(
        '0.00a'
      )}`

    let rangeRooms = ''
    if (rooms && rooms.min !== null && rooms.max !== null) {
      rangeRooms = rooms.min === MAX_GROUP_ITEMS_SELECTION ? `${rooms.min} ou mais quartos` : `${rooms.min} quarto${rooms.min > 1 ? 's' : ''}`
    }

    let rangeGarageSpots = ''
    if (garageSpots && garageSpots.min !== null && garageSpots.max !== null) {
      if (garageSpots.min === 0) {
        rangeGarageSpots = 'Sem vagas'
      } else {
        rangeGarageSpots = garageSpots.min === MAX_GROUP_ITEMS_SELECTION ? `${garageSpots.min} ou mais vagas` : `${garageSpots.min} vaga${garageSpots.min > 1 ? 's' : ''}`
      }
    }

    const rangeArea = area && `${area.min} - ${area.max} m²`

    const rangeNeighborhoods =
      neighborhoods &&
      neighborhoods.length > 0 &&
      `${neighborhoods[0].value}${
        neighborhoods.length > 1 ? ` e mais ${neighborhoods.length - 1}` : ''
      }`

    const filters = [
      {filter: FILTERS.TYPES, value: propertyTypes},
      {filter: FILTERS.NEIGHBORHOODS, value: rangeNeighborhoods},
      {filter: FILTERS.PRICE, value: rangePrice},
      {filter: FILTERS.ROOMS, value: rangeRooms},
      {filter: FILTERS.GARAGE_SPOTS, value: rangeGarageSpots},
      {filter: FILTERS.AREA, value: rangeArea}
    ].filter((filter) => filter.value)

    return filters.map(({filter, value}) => (
      {filter: filter, value: value}
    ))
  }

  getFiltersLabels(filter) {
    const selectedFilter = this.activeFilters(this.props.filters).find((item) => item.filter === filter)
    if (selectedFilter) {
      return selectedFilter.value
    }
    switch (filter) {
      case FILTERS.TYPES: return 'Tipos de imóveis'
      case FILTERS.AREA: return 'Área'
      case FILTERS.PRICE: return 'Valor'
      case FILTERS.ROOMS: return 'Quartos'
      case FILTERS.GARAGE_SPOTS: return 'Vagas de garagem'
      default:
    }
    return ''
  }

  showFilter(filter, event) {
    const { target } = event
    const panelPosition = {left: target.getBoundingClientRect().left, top: target.getBoundingClientRect().top}
    this.setState({
      values: clone(this.state.previousValues),
      showType: filter === FILTERS.TYPES ? !this.state.showType : false,
      showArea: filter === FILTERS.AREA ? !this.state.showArea : false,
      showPrice: filter === FILTERS.PRICE ? !this.state.showPrice : false,
      showRooms: filter === FILTERS.ROOMS ? !this.state.showRooms : false,
      showGarage: filter === FILTERS.GARAGE_SPOTS ? !this.state.showGarage : false,
      panelPosition
    })
  }

  applyFilters() {
    this.setState({
      previousValues: clone(this.state.values)
    }, () => {
      this.hideAllFilters()
      this.restorePreviousValues()
      this.props.onChange(this.state.values)
    })
  }

  restorePreviousValues() {
    this.setState({
      values: clone(this.state.previousValues)
    })
  }

  hideAllFilters() {
    this.setState({
      showType: false,
      showArea: false,
      showPrice: false,
      showRooms: false,
      showGarage: false
    })
  }

  isFilterOpen() {
    return (
      this.state.showType ||
      this.state.showArea ||
      this.state.showPrice ||
      this.state.showRooms ||
      this.state.showGarage
    )
  }

  render() {
    const {
      filters: {
        garageSpots,
        rooms,
        neighborhoods: selectedNeighborhoods
      }
    } = this.props

    const {
      values: {
        area: userArea,
        price: userPrice,
        rooms: userRooms,
        garageSpots: userGarageSpots
      }
    } = this.state

    const selectedFilters = this.activeFilters(this.props.filters)
    const selectedFiltersArray = selectedFilters.map((item) => item.filter)
    const hasSelectedAnyTypes = selectedFiltersArray.includes(FILTERS.TYPES)

    const userSelectedFilters = this.activeFilters(this.state.values)
    const userSelectedFiltersArray = userSelectedFilters.map((item) => item.filter)
    const userHasSelectedAnyTypes = userSelectedFiltersArray.includes(FILTERS.TYPES)

    return (
      <Query query={GET_NEIGHBORHOODS} ssr={false}>
        {({data: {neighborhoods = []}}) => {
          const neighborhoodsOptions = neighborhoodOptions(neighborhoods)
          return (
            <Row p={4}>
              <Overlay onClick={() => {this.hideAllFilters(); this.restorePreviousValues();}} />
              <Row flexDirection="row" flexWrap="wrap" style={{position: 'relative'}}>
                <FilterButton
                  active={hasSelectedAnyTypes}
                  onClick={this.showFilter.bind(this, FILTERS.TYPES)}
                  onRemoveFilter={this.resetFilter.bind(this, FILTERS.TYPES)}
                  showRemoveButton={selectedFiltersArray.includes(FILTERS.TYPES)}>
                    {this.getFiltersLabels(FILTERS.TYPES)}
                </FilterButton>
                <FilterButton
                  active={selectedFiltersArray.includes(FILTERS.AREA)}
                  onClick={this.showFilter.bind(this, FILTERS.AREA)}
                  onRemoveFilter={this.resetFilter.bind(this, FILTERS.AREA)}
                  showRemoveButton={selectedFiltersArray.includes(FILTERS.AREA)}>
                    {this.getFiltersLabels(FILTERS.AREA)}
                </FilterButton>
                <FilterButton
                  active={selectedFiltersArray.includes(FILTERS.PRICE)}
                  onClick={this.showFilter.bind(this, FILTERS.PRICE)}
                  onRemoveFilter={this.resetFilter.bind(this, FILTERS.PRICE)}
                  showRemoveButton={selectedFiltersArray.includes(FILTERS.PRICE)}>
                    {this.getFiltersLabels(FILTERS.PRICE)}
                </FilterButton>
                <FilterButton
                  active={selectedFiltersArray.includes(FILTERS.ROOMS)}
                  onClick={this.showFilter.bind(this, FILTERS.ROOMS)}
                  onRemoveFilter={this.resetFilter.bind(this, FILTERS.ROOMS)}
                  showRemoveButton={selectedFiltersArray.includes(FILTERS.ROOMS)}>
                    {this.getFiltersLabels(FILTERS.ROOMS)}
                </FilterButton>
                <FilterButton
                  active={selectedFiltersArray.includes(FILTERS.GARAGE_SPOTS)}
                  onClick={this.showFilter.bind(this, FILTERS.GARAGE_SPOTS)}
                  onRemoveFilter={this.resetFilter.bind(this, FILTERS.GARAGE_SPOTS)}
                  showRemoveButton={selectedFiltersArray.includes(FILTERS.GARAGE_SPOTS)}>
                    {this.getFiltersLabels(FILTERS.GARAGE_SPOTS)}
                </FilterButton>
              </Row>
              <FilterPanel
                show={this.state.showType}
                panelPosition={this.state.panelPosition}
                apply={this.applyFilters}
                clear={this.resetFilter.bind(this, FILTERS.TYPES)}
              >
                <FilterButton
                  active={userHasSelectedAnyTypes && this.state.values && this.state.values.types.includes('Apartamento')}
                  onClick={this.onChangeListingType.bind(this, 'Apartamento')}
                >
                  Apartamento
                </FilterButton>
                <FilterButton
                  active={userHasSelectedAnyTypes && this.state.values && this.state.values.types.includes('Casa')}
                  onClick={this.onChangeListingType.bind(this, 'Casa')}
                >
                  Casa
                </FilterButton>
                <FilterButton
                  active={userHasSelectedAnyTypes && this.state.values && this.state.values.types.includes('Cobertura')}
                  onClick={this.onChangeListingType.bind(this, 'Cobertura')}
                >
                  Cobertura
                </FilterButton>
              </FilterPanel>
              <FilterPanel
                show={this.state.showArea}
                panelPosition={this.state.panelPosition}
                apply={this.applyFilters}
                clear={this.resetFilter.bind(this, FILTERS.AREA)}
              >
                <NewSlider
                  min={AREA_FILTER.MIN}
                  values={userArea}
                  max={AREA_FILTER.MAX}
                  isRange
                  onChange={this.sliderChanged.bind(this, FILTERS.AREA)}
                  valuesFormatter={(value) => `${value} m²`}
                />
              </FilterPanel>
              <FilterPanel
                show={this.state.showPrice}
                panelPosition={this.state.panelPosition}
                apply={this.applyFilters}
                clear={this.resetFilter.bind(this, FILTERS.PRICE)}
              >
                <NewSlider
                  min={PRICE_FILTER.MIN}
                  max={PRICE_FILTER.MAX}
                  values={userPrice}
                  isRange
                  onChange={this.sliderChanged.bind(this, FILTERS.PRICE)}
                  valuesRounder={(value) =>
                    Math.ceil(value / 10000) * 10000
                  }
                  valuesFormatter={(value) =>
                    ` R$ ${value.toLocaleString('pt-BR')}`
                  }
                />
              </FilterPanel>
              <FilterPanel
                show={this.state.showRooms}
                panelPosition={this.state.panelPosition}
                apply={this.applyFilters}
                clear={this.resetFilter.bind(this, FILTERS.ROOMS)}
              >
                <Button.Group
                  flexWrap="wrap"
                  initialValue={rooms}
                  strategy={{
                    isSelected: (selectedValue, value) => selectedValue === value,
                    update: (selectedValue, value) => (selectedValue === value ? null : value)
                  }}
                  onChange={(value) => {
                    if (value === null) {
                      return
                    }
                    let values = {minValue: MIN_GROUP_FILTER_VALUE, maxValue: MAX_GROUP_FILTER_VALUE}
                    if (value === 'more') {
                      values.minValue = MAX_GROUP_ITEMS_SELECTION
                    } else {
                      values.minValue = value
                      values.maxValue = value
                    }
                    this.sliderChanged(FILTERS.ROOMS, values, true)
                }}>
                  <FilterButton active={userRooms && userRooms.min === 1} value={1}>1</FilterButton>
                  <FilterButton active={userRooms && userRooms.min === 2} value={2}>2</FilterButton>
                  <FilterButton active={userRooms && userRooms.min === 3} value={3}>3</FilterButton>
                  <FilterButton active={userRooms && userRooms.min === 4} value={4}>4</FilterButton>
                  <FilterButton active={userRooms && userRooms.min === 5} value="more">+</FilterButton>
                </Button.Group>
              </FilterPanel>
              <FilterPanel
                show={this.state.showGarage}
                panelPosition={this.state.panelPosition}
                apply={this.applyFilters}
                clear={this.resetFilter.bind(this, FILTERS.GARAGE_SPOTS)}
              >
                <Button.Group
                  flexWrap="wrap"
                  initialValue={garageSpots}
                  strategy={{
                    isSelected: (selectedValue, value) => selectedValue === value,
                    update: (selectedValue, value) => (selectedValue === value ? null : value)
                  }}
                  onChange={(value) => {
                    if (value === null) {
                      return
                    }
                    let values = {minValue: MIN_GROUP_FILTER_VALUE, maxValue: MAX_GROUP_FILTER_VALUE}
                    if (value === 'more') {
                      values.minValue = MAX_GROUP_ITEMS_SELECTION
                    } else {
                      values.minValue = value
                      values.maxValue = value
                    }
                    this.sliderChanged(FILTERS.GARAGE_SPOTS, values, true)
                }}>
                  <FilterButton active={userGarageSpots && userGarageSpots.min === 0} value={0}>Sem vagas</FilterButton>
                  <FilterButton active={userGarageSpots && userGarageSpots.min === 1} value={1}>1</FilterButton>
                  <FilterButton active={userGarageSpots && userGarageSpots.min === 2} value={2}>2</FilterButton>
                  <FilterButton active={userGarageSpots && userGarageSpots.min === 3} value={3}>3</FilterButton>
                  <FilterButton active={userGarageSpots && userGarageSpots.min === 4} value={4}>4</FilterButton>
                  <FilterButton active={userGarageSpots && userGarageSpots.min === 5} value="more">+</FilterButton>
                </Button.Group>
              </FilterPanel>
            </Row>
          )
        }}
      </Query>
    )
  }
}
