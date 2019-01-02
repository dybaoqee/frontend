import {Component} from 'react'
import PropTypes from 'prop-types'
import includes from 'lodash/includes'
import remove from 'lodash/remove'
import NewSlider from 'components/shared/Common/NewSlider'
import {neighborhoodOptions} from 'constants/listing-filter-options'
import {Query} from 'react-apollo'
import {GET_NEIGHBORHOODS} from 'graphql/listings/queries'
import FilterPanel from './components/FilterPanel'
import FilterButton from './components/FilterButton'
import ButtonGroupFilter from './components/ButtonGroupFilter'
import { clone } from 'utils/clone'
import {
  MAX_FILTER_PANEL_DESKTOP_WIDTH
} from './components/FilterPanel/styles'
import {
  Container,
  Overlay,
  ButtonsWrapper
} from './styles'
import { activeFilters } from './lib'
import {
  FILTERS,
  AREA_FILTER,
  PRICE_FILTER
} from './constants'

class ListingFilter extends Component {
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

  getFiltersLabels(filter) {
    const selectedFilter = activeFilters(this.props.filters).find((item) => item.filter === filter)
    if (selectedFilter) {
      return selectedFilter.value
    }
    switch (filter) {
      case FILTERS.TYPES.code: return FILTERS.TYPES.label
      case FILTERS.AREA.code: return FILTERS.AREA.label
      case FILTERS.PRICE.code: return FILTERS.PRICE.label
      case FILTERS.ROOMS.code: return FILTERS.ROOMS.label
      case FILTERS.GARAGE_SPOTS.code: return FILTERS.GARAGE_SPOTS.label
      default:
    }
    return ''
  }

  showFilter(filter, event) {
    const { target } = event
    const panelPosition = {left: target.getBoundingClientRect().left, top: target.getBoundingClientRect().top}
    this.setState({
      values: clone(this.state.previousValues),
      showType: filter === FILTERS.TYPES.code ? !this.state.showType : false,
      showArea: filter === FILTERS.AREA.code ? !this.state.showArea : false,
      showPrice: filter === FILTERS.PRICE.code ? !this.state.showPrice : false,
      showRooms: filter === FILTERS.ROOMS.code ? !this.state.showRooms : false,
      showGarage: filter === FILTERS.GARAGE_SPOTS.code ? !this.state.showGarage : false,
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
        rooms,
        garageSpots,
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

    const selectedFilters = activeFilters(this.props.filters)
    const selectedFiltersArray = selectedFilters.map((item) => item.filter)
    const hasSelectedAnyTypes = selectedFiltersArray.includes(FILTERS.TYPES.code)

    const userSelectedFilters = activeFilters(this.state.values)
    const userSelectedFiltersArray = userSelectedFilters.map((item) => item.filter)
    const userHasSelectedAnyTypes = userSelectedFiltersArray.includes(FILTERS.TYPES.code)

    const isFilterOpen = this.isFilterOpen()

    return (
      <Query query={GET_NEIGHBORHOODS} ssr={false}>
        {({data: {neighborhoods = []}}) => {
          const neighborhoodsOptions = neighborhoodOptions(neighborhoods)
          return (
            <Container isFilterOpen={isFilterOpen}>
              <Overlay onClick={() => {this.hideAllFilters(); this.restorePreviousValues();}} />
              <ButtonsWrapper>
                <FilterButton
                  active={hasSelectedAnyTypes}
                  onClick={this.showFilter.bind(this, FILTERS.TYPES.code)}>
                    {this.getFiltersLabels(FILTERS.TYPES.code)}
                </FilterButton>
                <FilterButton
                  active={selectedFiltersArray.includes(FILTERS.AREA.code)}
                  onClick={this.showFilter.bind(this, FILTERS.AREA.code)}>
                    {this.getFiltersLabels(FILTERS.AREA.code)}
                </FilterButton>
                <FilterButton
                  active={selectedFiltersArray.includes(FILTERS.PRICE.code)}
                  onClick={this.showFilter.bind(this, FILTERS.PRICE.code)}>
                    {this.getFiltersLabels(FILTERS.PRICE.code)}
                </FilterButton>
                <FilterButton
                  active={selectedFiltersArray.includes(FILTERS.ROOMS.code)}
                  onClick={this.showFilter.bind(this, FILTERS.ROOMS.code)}>
                    {this.getFiltersLabels(FILTERS.ROOMS.code)}
                </FilterButton>
                <FilterButton
                  active={selectedFiltersArray.includes(FILTERS.GARAGE_SPOTS.code)}
                  onClick={this.showFilter.bind(this, FILTERS.GARAGE_SPOTS.code)}>
                    {this.getFiltersLabels(FILTERS.GARAGE_SPOTS.code)}
                </FilterButton>
              </ButtonsWrapper>
              <FilterPanel
                title={FILTERS.TYPES.label}
                show={this.state.showType}
                close={this.hideAllFilters}
                panelPosition={this.state.panelPosition}
                apply={this.applyFilters}
                clear={this.resetFilter.bind(this, FILTERS.TYPES.code)}
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
                title={FILTERS.AREA.label}
                show={this.state.showArea}
                close={this.hideAllFilters}
                panelPosition={this.state.panelPosition}
                apply={this.applyFilters}
                clear={this.resetFilter.bind(this, FILTERS.AREA.code)}
              >
                <NewSlider
                  railWidth={MAX_FILTER_PANEL_DESKTOP_WIDTH}
                  min={AREA_FILTER.MIN}
                  max={AREA_FILTER.MAX}
                  values={userArea}
                  isRange
                  onChange={this.sliderChanged.bind(this, FILTERS.AREA.code)}
                  valuesFormatter={(value) => `${value} m²`}
                />
              </FilterPanel>
              <FilterPanel
                title={FILTERS.PRICE.label}
                show={this.state.showPrice}
                close={this.hideAllFilters}
                panelPosition={this.state.panelPosition}
                apply={this.applyFilters}
                clear={this.resetFilter.bind(this, FILTERS.PRICE.code)}
              >
                <NewSlider
                  railWidth={MAX_FILTER_PANEL_DESKTOP_WIDTH}
                  min={PRICE_FILTER.MIN}
                  max={PRICE_FILTER.MAX}
                  values={userPrice}
                  isRange
                  onChange={this.sliderChanged.bind(this, FILTERS.PRICE.code)}
                  valuesRounder={(value) =>
                    Math.ceil(value / 10000) * 10000
                  }
                  valuesFormatter={(value) =>
                    ` R$ ${value.toLocaleString('pt-BR')}`
                  }
                />
              </FilterPanel>
              <FilterPanel
                title={FILTERS.ROOMS.label}
                show={this.state.showRooms}
                close={this.hideAllFilters}
                panelPosition={this.state.panelPosition}
                apply={this.applyFilters}
                clear={this.resetFilter.bind(this, FILTERS.ROOMS.code)}
              >
                <ButtonGroupFilter
                  initialValue={rooms}
                  userValue={userRooms && userRooms.min}
                  onChange={(value) => {this.sliderChanged(FILTERS.ROOMS.code, value, true)}}
                  values={[
                    {value: 1, label: '1'},
                    {value: 2, label: '2'},
                    {value: 3, label: '3'},
                    {value: 4, label: '4'},
                    {value: 5, label: '+'},
                  ]}
                />
              </FilterPanel>
              <FilterPanel
                title={FILTERS.GARAGE_SPOTS.label}
                close={this.hideAllFilters}
                show={this.state.showGarage}
                panelPosition={this.state.panelPosition}
                apply={this.applyFilters}
                clear={this.resetFilter.bind(this, FILTERS.GARAGE_SPOTS.code)}
              >
                <ButtonGroupFilter
                  initialValue={garageSpots}
                  userValue={userGarageSpots && userGarageSpots.min}
                  onChange={(value) => {this.sliderChanged(FILTERS.GARAGE_SPOTS.code, value, true)}}
                  values={[
                    {value: 0, label: 'Sem vagas'},
                    {value: 1, label: '1'},
                    {value: 2, label: '2'},
                    {value: 3, label: '3'},
                    {value: 4, label: '4'},
                    {value: 5, label: '+'},
                  ]}
                />
              </FilterPanel>
            </Container>
          )
        }}
      </Query>
    )
  }
}

ListingFilter.propTypes = {
  filters: PropTypes.object,
  neighborhoods: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  initialFilters: PropTypes.object
}

export default ListingFilter
