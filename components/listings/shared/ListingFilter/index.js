import {Component} from 'react'
import numeral from 'numeral'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBuilding from '@fortawesome/fontawesome-pro-light/faBuilding'
import faRoof from '@fortawesome/fontawesome-pro-light/faWarehouse'
import faHome from '@fortawesome/fontawesome-pro-light/faHome'
import faTrash from '@fortawesome/fontawesome-pro-light/faTrash'
import faRemove from '@fortawesome/fontawesome-pro-light/faTimesCircle'
import includes from 'lodash/includes'
import remove from 'lodash/remove'
import {
  Container,
  FilterApplied,
  FilterButton
} from './styles'
import NewSlider from 'components/shared/Common/NewSlider'
import Select from 'react-select'
import {neighborhoodOptions} from 'constants/listing-filter-options'
import {Query} from 'react-apollo'
import {GET_NEIGHBORHOODS} from 'graphql/listings/queries'
import FilterPanel from './components/FilterPanel'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'

export default class Filter extends Component {
  constructor(props) {
    super(props)
    this.toggleTypeFilter = this.toggleTypeFilter.bind(this)
    this.toggleAreaFilter = this.toggleAreaFilter.bind(this)
    this.togglePriceFilter = this.togglePriceFilter.bind(this)
    this.toggleRoomsFilter = this.toggleRoomsFilter.bind(this)
    this.toggleGarageFilter = this.toggleGarageFilter.bind(this)

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
      showArea: false
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

    const rangeRooms = rooms && `${rooms.min} - ${rooms.max} quartos`
    const rangeGarageSpots =
      garageSpots && `${garageSpots.min} - ${garageSpots.max} vagas`

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
      <FilterApplied key={filter}>
        <span onClick={this.onToggle}>{value}</span>
        <FontAwesomeIcon
          icon={faRemove}
          onClick={this.resetFilter.bind(this, filter)}
        />
      </FilterApplied>
    ))
  }

  toggleTypeFilter() {
      this.setState({
        showType: !this.state.showType,
        showArea: false,
        showPrice: false,
        showRooms: false,
        showGarage: false
      })
  }

  toggleAreaFilter() {
    this.setState({
      showType: false,
      showArea: !this.state.showArea,
      showPrice: false,
      showRooms: false,
      showGarage: false
    })
  }

  togglePriceFilter() {
    this.setState({
      showType: false,
      showArea: false,
      showPrice: !this.state.showPrice,
      showRooms: false,
      showGarage: false
    })
  }

  toggleRoomsFilter() {
    this.setState({
      showType: false,
      showArea: false,
      showPrice: false,
      showRooms: !this.state.showRooms,
      showGarage: false
    })
  }

  toggleGarageFilter() {
    this.setState({
      showType: false,
      showArea: false,
      showPrice: false,
      showRooms: false,
      showGarage: !this.state.showGarage
    })
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
    const hasSelectedAnyTypes = !!types && types.length > 0

    return (
      <Query query={GET_NEIGHBORHOODS} ssr={false}>
        {({data: {neighborhoods = []}}) => {
          const neighborhoodsOptions = neighborhoodOptions(neighborhoods)
          return (
            <Container>
              <Row flexDirection="row" flexWrap="wrap" style={{position: 'relative'}}>
                <FilterButton active={hasSelectedAnyTypes} onClick={this.toggleTypeFilter}>Tipos de imóveis</FilterButton>
                <FilterButton onClick={this.toggleAreaFilter}>Área</FilterButton>
                <FilterButton onClick={this.togglePriceFilter}>Valor</FilterButton>
                <FilterButton onClick={this.toggleRoomsFilter}>Quartos</FilterButton>
                <FilterButton onClick={this.toggleGarageFilter}>Vagas de garagem</FilterButton>
              </Row>
              <FilterPanel show={this.state.showType}>
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
              <FilterPanel show={this.state.showArea}>
                <NewSlider
                  min={35}
                  values={area}
                  max={500}
                  isRange
                  onChange={this.sliderChanged.bind(this, 'area')}
                  valuesFormatter={(value) => `${value} m²`}
                />
              </FilterPanel>
              <FilterPanel show={this.state.showPrice}>
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
              <FilterPanel show={this.state.showRooms}>
                <NewSlider
                  values={rooms}
                  min={1}
                  max={8}
                  isRange
                  onChange={this.sliderChanged.bind(this, 'rooms')}
                />
              </FilterPanel>
              <FilterPanel show={this.state.showGarage}>
                <NewSlider
                  min={0}
                  values={garageSpots}
                  max={8}
                  isRange
                  onChange={this.sliderChanged.bind(this, 'garageSpots')}
                />
              </FilterPanel>
            </Container>
          )
        }}
      </Query>
    )
  }
}
