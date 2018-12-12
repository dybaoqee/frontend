import {Component} from 'react'
import includes from 'lodash/includes'
import remove from 'lodash/remove'
import numeral from 'numeral'
import {
  Overlay,
  FilterButton
} from './styles'
import NewSlider from 'components/shared/Common/NewSlider'
import {neighborhoodOptions} from 'constants/listing-filter-options'
import {Query} from 'react-apollo'
import {GET_NEIGHBORHOODS} from 'graphql/listings/queries'
import FilterPanel from './components/FilterPanel'
import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'

const MIN_FILTER_VALUE = 0
const MAX_FILTER_VALUE = 100

const MAX_ITEMS_SELECTION = 5

export default class Filter extends Component {
  constructor(props) {
    super(props)
    this.isFilterOpen = this.isFilterOpen.bind(this)
    this.hideAllFilters = this.hideAllFilters.bind(this)

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
      values: initialValues,
      showType: false,
      showArea: false,
      showPrice: false,
      showRooms: false,
      showGarage: false,
      panelPosition: null
    }
  }

  setFilters = (filters) => {
    const updatedValues = {...filters}

    if (filters.neighborhoods) {
      updatedValues.neighborhoods = filters.neighborhoods.map(
        (neighborhood) => ({
          value: neighborhood,
          label: neighborhood
        })
      )
    }

    this.setState({values: updatedValues})
  }

  sliderChanged = (value, {minValue, maxValue}, userClicked) => {
    if (userClicked) {
      const {values} = this.state
      const {onChange} = this.props
      let updatedValues = values
      if (!updatedValues[value]) {
        updatedValues[value] = {}
      }
      updatedValues[value].min = minValue
      updatedValues[value].max = maxValue
      this.setState({values: updatedValues})
      onChange(updatedValues)
    }
  }

  neighborhoodChanged = (neighborhoods) => {
    const {values} = this.state
    const {onChange} = this.props
    let updatedValues = values
    updatedValues.neighborhoods = neighborhoods
    onChange(updatedValues)
    this.setState({values: updatedValues})
  }

  onChangeListingType = ({currentTarget}) => {
    const {values} = this.state
    const {onChange} = this.props
    const listingType = currentTarget.getAttribute('aria-label')

    let updatedValues = values
    updatedValues.types = updatedValues.types || []

    if (!includes(updatedValues.types, listingType)) {
      updatedValues.types.push(listingType)
    } else {
      remove(updatedValues.types, (item) => item === listingType)
    }
    onChange(updatedValues)
    this.setState({values: updatedValues})
  }

  resetFilter = (filter) => {
    const {onChange} = this.props
    const {values} = this.state
    let updatedValues = values
    delete updatedValues[filter]
    this.setState({values: updatedValues})
    onChange(updatedValues)
  }

  resetFilters = () => {
    const {onReset} = this.props
    this.setState({values: {}})
    onReset && onReset()
  }

  removeFilters = () => {
    this.setState({values: {}})
  }

  get activeFilters() {
    const {
      values: {types, price, neighborhoods, rooms, garageSpots, area}
    } = this.state

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
    const selectedFilter = this.activeFilters.find((item) => item.filter === filter)
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
      showType: filter === 'type' ? !this.state.showType : false,
      showArea: filter === 'area' ? !this.state.showArea : false,
      showPrice: filter === 'price' ? !this.state.showPrice : false,
      showRooms: filter === 'rooms' ? !this.state.showRooms : false,
      showGarage: filter === 'garage' ? !this.state.showGarage : false,
      panelPosition
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
      values: {
        area,
        price,
        garageSpots,
        rooms,
        types,
        neighborhoods: selectedNeighborhoods
      }
    } = this.state
    const {onChangeListingType, resetFilter} = this
    const selectedFilters = this.activeFilters
    const selectedFiltersArray = selectedFilters.map((item) => item.filter)
    const hasSelectedAnyTypes = selectedFiltersArray.includes('types')
    return (
      <Query query={GET_NEIGHBORHOODS} ssr={false}>
        {({data: {neighborhoods = []}}) => {
          const neighborhoodsOptions = neighborhoodOptions(neighborhoods)
          return (
            <Row p={4}>
              <Overlay onClick={this.hideAllFilters} />
              <Row flexDirection="row" flexWrap="wrap" style={{position: 'relative'}}>
                <FilterButton active={hasSelectedAnyTypes} onClick={this.showFilter.bind(this, 'type')}>{this.getFiltersLabels('types')}</FilterButton>
                <FilterButton active={selectedFiltersArray.includes('area')} onClick={this.showFilter.bind(this, 'area')}>{this.getFiltersLabels('area')}</FilterButton>
                <FilterButton active={selectedFiltersArray.includes('price')} onClick={this.showFilter.bind(this, 'price')}>{this.getFiltersLabels('price')}</FilterButton>
                <FilterButton active={selectedFiltersArray.includes('rooms')} onClick={this.showFilter.bind(this, 'rooms')}>{this.getFiltersLabels('rooms')}</FilterButton>
                <FilterButton active={selectedFiltersArray.includes('garageSpots')} onClick={this.showFilter.bind(this, 'garage')}>{this.getFiltersLabels('garageSpots')}</FilterButton>
              </Row>
              <FilterPanel show={this.state.showType} panelPosition={this.state.panelPosition} close={this.hideAllFilters}>
                <FilterButton
                  aria-label="Apartamento"
                  active={hasSelectedAnyTypes && types.includes('Apartamento')}
                  onClick={onChangeListingType}
                >
                  Apartamento
                </FilterButton>
                <FilterButton
                  aria-label="Casa"
                  active={hasSelectedAnyTypes && types.includes('Casa')}
                  onClick={onChangeListingType}
                >
                  Casa
                </FilterButton>
                <FilterButton
                  aria-label="Cobertura"
                  active={hasSelectedAnyTypes && types.includes('Cobertura')}
                  onClick={onChangeListingType}
                >
                  Cobertura
                </FilterButton>
              </FilterPanel>
              <FilterPanel show={this.state.showArea} panelPosition={this.state.panelPosition} close={this.hideAllFilters}>
                <NewSlider
                  min={35}
                  values={area}
                  max={500}
                  isRange
                  onChange={this.sliderChanged.bind(this, 'area')}
                  valuesFormatter={(value) => `${value} m²`}
                />
              </FilterPanel>
              <FilterPanel show={this.state.showPrice} panelPosition={this.state.panelPosition} close={this.hideAllFilters}>
                <NewSlider
                  min={550000}
                  max={12000000}
                  values={price}
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
              <FilterPanel show={this.state.showRooms} panelPosition={this.state.panelPosition} close={this.hideAllFilters}>
                <Button.Group
                  flexWrap="wrap"
                  initialValue={rooms}
                  strategy={{
                    isSelected: (selectedValue, value) => selectedValue === value,
                    update: (selectedValue, value) => (selectedValue === value ? null : value)
                  }}
                  onChange={(value) => {
                    // reset filter
                    if (value === null) {
                      this.resetFilter('rooms')
                      return
                    }

                    // apply filter
                    let values = {minValue: MIN_FILTER_VALUE, maxValue: MAX_FILTER_VALUE}
                    if (value === 'more') {
                      values.minValue = MAX_ITEMS_SELECTION
                    } else {
                      values.minValue = value
                      values.maxValue = value
                    }
                    this.sliderChanged('rooms', values, true)
                }}>
                  <FilterButton active={rooms && rooms.min === 1} mr={2} px={[2, 3]} value={1}>1</FilterButton>
                  <FilterButton active={rooms && rooms.min === 2} mr={2} px={[2, 3]} value={2}>2</FilterButton>
                  <FilterButton active={rooms && rooms.min === 3} mr={2} px={[2, 3]} value={3}>3</FilterButton>
                  <FilterButton active={rooms && rooms.min === 4} mr={2} px={[2, 3]} value={4}>4</FilterButton>
                  <FilterButton active={rooms && rooms.min === 5} mr={2} px={[2, 3]} value="more">+</FilterButton>
                </Button.Group>
              </FilterPanel>
              <FilterPanel show={this.state.showGarage} panelPosition={this.state.panelPosition} close={this.hideAllFilters}>
                <Button.Group
                  flexWrap="wrap"
                  initialValue={garageSpots}
                  strategy={{
                    isSelected: (selectedValue, value) => selectedValue === value,
                    update: (selectedValue, value) => (selectedValue === value ? null : value)
                  }}
                  onChange={(value) => {
                    // reset filter
                    if (value === null) {
                      this.resetFilter('garageSpots')
                      return
                    }

                    // apply filter
                    let values = {minValue: MIN_FILTER_VALUE, maxValue: MAX_FILTER_VALUE}
                    if (value === 'more') {
                      values.minValue = MAX_ITEMS_SELECTION
                    } else {
                      values.minValue = value
                      values.maxValue = value
                    }
                    this.sliderChanged('garageSpots', values, true)
                }}>
                  <FilterButton active={garageSpots && garageSpots.min === 0} mr={2} mb={2} px={[2, 3]} value={0}>Sem vagas</FilterButton>
                  <FilterButton active={garageSpots && garageSpots.min === 1} mr={2} mb={2} px={[2, 3]} value={1}>1</FilterButton>
                  <FilterButton active={garageSpots && garageSpots.min === 2} mr={2} mb={2} px={[2, 3]} value={2}>2</FilterButton>
                  <FilterButton active={garageSpots && garageSpots.min === 3} mr={2} mb={2} px={[2, 3]} value={3}>3</FilterButton>
                  <FilterButton active={garageSpots && garageSpots.min === 4} mr={2} mb={2} px={[2, 3]} value={4}>4</FilterButton>
                  <FilterButton active={garageSpots && garageSpots.min === 5} mr={2} mb={2} px={[2, 3]} value="more">+</FilterButton>
                </Button.Group>
              </FilterPanel>
            </Row>
          )
        }}
      </Query>
    )
  }
}
