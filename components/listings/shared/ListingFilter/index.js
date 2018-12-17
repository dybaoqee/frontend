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
import {
  Overlay
} from './styles'

const MIN_FILTER_VALUE = 0
const MAX_FILTER_VALUE = 100

const MAX_ITEMS_SELECTION = 5

function clone(object) {
  return JSON.parse(JSON.stringify(object))
}

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
    console.log('change listing type', listingType)

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
      rangeRooms = rooms.min === MAX_ITEMS_SELECTION ? `${rooms.min} ou mais quartos` : `${rooms.min} quarto${rooms.min > 1 ? 's' : ''}`
    }

    let rangeGarageSpots = ''
    if (garageSpots && garageSpots.min !== null && garageSpots.max !== null) {
      if (garageSpots.min === 0) {
        rangeGarageSpots = 'Sem vagas'
      } else {
        rangeGarageSpots = garageSpots.min === MAX_ITEMS_SELECTION ? `${garageSpots.min} ou mais vagas` : `${garageSpots.min} vaga${garageSpots.min > 1 ? 's' : ''}`
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
      {filter: 'types', value: propertyTypes},
      {filter: 'neighborhoods', value: rangeNeighborhoods},
      {filter: 'price', value: rangePrice},
      {filter: 'rooms', value: rangeRooms},
      {filter: 'garageSpots', value: rangeGarageSpots},
      {filter: 'area', value: rangeArea}
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
      case 'types': return 'Tipos de imóveis'
      case 'area': return 'Área'
      case 'price': return 'Valor'
      case 'rooms': return 'Quartos'
      case 'garageSpots': return 'Vagas de garagem'
      default:
    }
    return ''
  }

  showFilter(filter, event) {
    const { target } = event
    const panelPosition = {left: target.getBoundingClientRect().left, top: target.getBoundingClientRect().top}
    this.setState({
      values: clone(this.state.previousValues),
      showType: filter === 'type' ? !this.state.showType : false,
      showArea: filter === 'area' ? !this.state.showArea : false,
      showPrice: filter === 'price' ? !this.state.showPrice : false,
      showRooms: filter === 'rooms' ? !this.state.showRooms : false,
      showGarage: filter === 'garage' ? !this.state.showGarage : false,
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
        area,
        price,
        garageSpots,
        rooms,
        types,
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
    const hasSelectedAnyTypes = selectedFiltersArray.includes('types')

    const userSelectedFilters = this.activeFilters(this.state.values)
    const userSelectedFiltersArray = userSelectedFilters.map((item) => item.filter)
    const userHasSelectedAnyTypes = userSelectedFiltersArray.includes('types')

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
                  onClick={this.showFilter.bind(this, 'type')}
                  onRemoveFilter={this.resetFilter.bind(this, 'types')}
                  showRemoveButton={selectedFiltersArray.includes('types')}>
                    {this.getFiltersLabels('types')}
                </FilterButton>
                <FilterButton
                  active={selectedFiltersArray.includes('area')}
                  onClick={this.showFilter.bind(this, 'area')}
                  onRemoveFilter={this.resetFilter.bind(this, 'area')}
                  showRemoveButton={selectedFiltersArray.includes('area')}>
                    {this.getFiltersLabels('area')}
                </FilterButton>
                <FilterButton
                  active={selectedFiltersArray.includes('price')}
                  onClick={this.showFilter.bind(this, 'price')}
                  onRemoveFilter={this.resetFilter.bind(this, 'price')}
                  showRemoveButton={selectedFiltersArray.includes('price')}>
                    {this.getFiltersLabels('price')}
                </FilterButton>
                <FilterButton
                  active={selectedFiltersArray.includes('rooms')}
                  onClick={this.showFilter.bind(this, 'rooms')}
                  onRemoveFilter={this.resetFilter.bind(this, 'rooms')}
                  showRemoveButton={selectedFiltersArray.includes('rooms')}>
                    {this.getFiltersLabels('rooms')}
                </FilterButton>
                <FilterButton
                  active={selectedFiltersArray.includes('garageSpots')}
                  onClick={this.showFilter.bind(this, 'garage')}
                  onRemoveFilter={this.resetFilter.bind(this, 'garageSpots')}
                  showRemoveButton={selectedFiltersArray.includes('garageSpots')}>
                    {this.getFiltersLabels('garageSpots')}
                </FilterButton>
              </Row>
              <FilterPanel
                show={this.state.showType}
                panelPosition={this.state.panelPosition}
                apply={this.applyFilters}
                clear={this.resetFilter.bind(this, 'types')}
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
                clear={this.resetFilter.bind(this, 'area')}
              >
                <NewSlider
                  min={35}
                  values={userArea}
                  max={500}
                  isRange
                  onChange={this.sliderChanged.bind(this, 'area')}
                  valuesFormatter={(value) => `${value} m²`}
                />
              </FilterPanel>
              <FilterPanel
                show={this.state.showPrice}
                panelPosition={this.state.panelPosition}
                apply={this.applyFilters}
                clear={this.resetFilter.bind(this, 'price')}
              >
                <NewSlider
                  min={550000}
                  max={12000000}
                  values={userPrice}
                  isRange
                  onChange={this.sliderChanged.bind(this, 'price')}
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
                clear={this.resetFilter.bind(this, 'rooms')}
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
                    let values = {minValue: MIN_FILTER_VALUE, maxValue: MAX_FILTER_VALUE}
                    if (value === 'more') {
                      values.minValue = MAX_ITEMS_SELECTION
                    } else {
                      values.minValue = value
                      values.maxValue = value
                    }
                    this.sliderChanged('rooms', values, true)
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
                clear={this.resetFilter.bind(this, 'garageSpots')}
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
                    let values = {minValue: MIN_FILTER_VALUE, maxValue: MAX_FILTER_VALUE}
                    if (value === 'more') {
                      values.minValue = MAX_ITEMS_SELECTION
                    } else {
                      values.minValue = value
                      values.maxValue = value
                    }
                    this.sliderChanged('garageSpots', values, true)
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
