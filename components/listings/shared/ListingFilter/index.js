import { Component } from 'react'
import PropTypes from 'prop-types'
import includes from 'lodash/includes'
import remove from 'lodash/remove'
import { PoseGroup } from 'react-pose'
import FadeInOut from 'components/shared/Animation/FadeInOut'
import NewSlider from 'components/shared/Common/NewSlider'
import Background from 'components/shared/Background'
import FilterPanel from './components/FilterPanel'
import FilterButton from './components/FilterButton'
import ButtonGroupFilter from './components/ButtonGroupFilter'
import ExpandButton from './components/ExpandButton'
import { clone } from 'utils/clone'
import { isMobile } from 'lib/mobile'
import {
  log,
  LISTING_SEARCH_FILTER_OPEN,
  LISTING_SEARCH_FILTER_APPLY,
  LISTING_SEARCH_FILTER_CLEAR,
  LISTING_SEARCH_FILTER_CLOSE,
  LISTING_SEARCH_FILTER_TOGGLE
} from 'lib/amplitude'
import {
  MAX_FILTER_PANEL_DESKTOP_WIDTH
} from './components/FilterPanel/styles'
import {
  Container,
  ButtonsWrapper
} from './styles'
import {
  getFilterButtons,
  userHasSelectedType
} from './lib'
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
    this.showFilter = this.showFilter.bind(this)
    this.toggleFilters = this.toggleFilters.bind(this)
    this.getOpenButton = this.getOpenButton.bind(this)

    const initialValues = {...props.initialFilters}

    this.state = {
      values: clone(initialValues),
      previousValues: clone(initialValues),
      showType: false,
      showArea: false,
      showPrice: false,
      showRooms: false,
      showGarage: false,
      panelPosition: null,
      expanded: false
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
      if ((value === 'price' && maxValue === PRICE_FILTER.MAX) || (value === 'area' && maxValue === AREA_FILTER.MAX)) {
        delete updatedValues[value].max
      }
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
    log(LISTING_SEARCH_FILTER_CLEAR, {filter: filter})
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

  showFilter(filter, event) {
    log(LISTING_SEARCH_FILTER_OPEN, {filter: filter})
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

  getOpenButton(filter) {
    switch (filter) {
      case FILTERS.TYPES.code:
        return this.state.showType
      case FILTERS.AREA.code:
        return this.state.showArea
      case FILTERS.AREA.code:
        return this.state.showArea
      case FILTERS.PRICE.code:
        return this.state.showPrice
      case FILTERS.ROOMS.code:
        return this.state.showRooms
      case FILTERS.GARAGE_SPOTS.code:
        return this.state.showGarage
      default:
        return false
    }
  }

  applyFilters(filter) {
    const newValues = clone(this.state.values)
    if (filter) {
      log(LISTING_SEARCH_FILTER_APPLY, {filter: filter, values: newValues})
    }
    this.setState({
      previousValues: newValues
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

  hideAllFilters(filter) {
    if (filter) {
      log(LISTING_SEARCH_FILTER_CLOSE, {filter: filter})
    }
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

  toggleFilters() {
    const newState = !this.state.expanded
    log(LISTING_SEARCH_FILTER_TOGGLE, {filtesVisible: newState})
    this.setState({expanded: newState})
  }

  render() {
    const {
      filters: {
        rooms,
        garageSpots
      }
    } = this.props

    const {
      values: {
        area: userArea,
        price: userPrice,
        rooms: userRooms,
        garageSpots: userGarageSpots
      },
      expanded
    } = this.state

    const isFilterOpen = this.isFilterOpen()

    return (
      <Container isFilterOpen={isFilterOpen}>
        <PoseGroup>
            <ButtonsWrapper expanded={expanded} key={1} pose={expanded ? 'open' : 'closed'}>
              {getFilterButtons(this.props.filters, this.showFilter, this.getOpenButton)}
              <ExpandButton
                expanded={expanded}
                onClick={this.toggleFilters}
              />
            </ButtonsWrapper>
        </PoseGroup>
        <FilterPanel
          filter={FILTERS.TYPES}
          show={this.state.showType}
          close={() => {this.hideAllFilters(FILTERS.TYPES.code)}}
          panelPosition={this.state.panelPosition}
          apply={() => {this.applyFilters(FILTERS.TYPES.code)}}
          clear={this.resetFilter.bind(this, FILTERS.TYPES.code)}
        >
          <FilterButton
            active={userHasSelectedType(this.state.values, 'Apartamento')}
            onClick={this.onChangeListingType.bind(this, 'Apartamento')}
          >
            Apartamento
          </FilterButton>
          <FilterButton
            active={userHasSelectedType(this.state.values, 'Casa')}
            onClick={this.onChangeListingType.bind(this, 'Casa')}
          >
            Casa
          </FilterButton>
          <FilterButton
            active={userHasSelectedType(this.state.values, 'Cobertura')}
            onClick={this.onChangeListingType.bind(this, 'Cobertura')}
          >
            Cobertura
          </FilterButton>
        </FilterPanel>
        <FilterPanel
          filter={FILTERS.AREA}
          show={this.state.showArea}
          close={() => {this.hideAllFilters(FILTERS.AREA.code)}}
          panelPosition={this.state.panelPosition}
          apply={() => {this.applyFilters(FILTERS.AREA.code)}}
          clear={this.resetFilter.bind(this, FILTERS.AREA.code)}
        >
          <NewSlider
            isRange
            hideMaxAt={AREA_FILTER.MAX}
            railWidth={MAX_FILTER_PANEL_DESKTOP_WIDTH}
            min={AREA_FILTER.MIN}
            max={AREA_FILTER.MAX}
            values={userArea}
            onChange={this.sliderChanged.bind(this, FILTERS.AREA.code)}
            valuesFormatter={(value) => `${value} m²`}
          />
        </FilterPanel>
        <FilterPanel
          filter={FILTERS.PRICE}
          show={this.state.showPrice}
          close={() => {this.hideAllFilters(FILTERS.PRICE.code)}}
          panelPosition={this.state.panelPosition}
          apply={() => {this.applyFilters(FILTERS.PRICE.code)}}
          clear={this.resetFilter.bind(this, FILTERS.PRICE.code)}
        >
          <NewSlider
            isRange
            hideMaxAt={PRICE_FILTER.MAX}
            railWidth={MAX_FILTER_PANEL_DESKTOP_WIDTH}
            min={PRICE_FILTER.MIN}
            max={PRICE_FILTER.MAX}
            values={userPrice}
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
          filter={FILTERS.ROOMS}
          show={this.state.showRooms}
          close={() => {this.hideAllFilters(FILTERS.ROOMS.code)}}
          panelPosition={this.state.panelPosition}
          apply={() => {this.applyFilters(FILTERS.ROOMS.code)}}
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
          filter={FILTERS.GARAGE_SPOTS}
          close={() => {this.hideAllFilters(FILTERS.GARAGE_SPOTS.code)}}
          show={this.state.showGarage}
          panelPosition={this.state.panelPosition}
          apply={() => {this.applyFilters(FILTERS.GARAGE_SPOTS.code)}}
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
        <PoseGroup>
          {(isFilterOpen && !isMobile()) &&
            <FadeInOut key={1}>
              <Background onClick={() => {
                this.hideAllFilters()
                this.restorePreviousValues()
              }} />
            </FadeInOut>
          }
        </PoseGroup>
      </Container>
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
