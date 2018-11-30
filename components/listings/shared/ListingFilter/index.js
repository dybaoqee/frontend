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
  Overlay,
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

  showFilter(filter, event) {
    const { target } = event
    const panelPosition = {left: target.getBoundingClientRect().left, top: target.getBoundingClientRect().top}
    this.setState({
      showType: filter === 'type' ? !this.state.showType : false,
      showArea: filter === 'area' ? !this.state.showArea : false,
      showPrice: filter === 'price' ? !this.state.showPrice : false,
      showRooms: filter === 'rooms' ? !this.state.showRooms : false,
      showGarage: filter === 'garage' ? !this.state.showGarage : false,
      panelPosition,
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
    const hasSelectedAnyTypes = !!types && types.length > 0

    return (
      <Query query={GET_NEIGHBORHOODS} ssr={false}>
        {({data: {neighborhoods = []}}) => {
          const neighborhoodsOptions = neighborhoodOptions(neighborhoods)
          return (
            <Row p={4}>
              
              <Row flexDirection="row" flexWrap="wrap" style={{position: 'relative'}}>
                <FilterButton active={hasSelectedAnyTypes} onClick={this.showFilter.bind(this, 'type')}>Tipos de imóveis</FilterButton>
                <FilterButton onClick={this.showFilter.bind(this, 'area')}>Área</FilterButton>
                <FilterButton onClick={this.showFilter.bind(this, 'price')}>Valor</FilterButton>
                <FilterButton onClick={this.showFilter.bind(this, 'rooms')}>Quartos</FilterButton>
                <FilterButton onClick={this.showFilter.bind(this, 'garage')}>Vagas de garagem</FilterButton>
              </Row>
              <FilterPanel show={this.state.showType} panelPosition={this.state.panelPosition}>
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
              <FilterPanel show={this.state.showArea} panelPosition={this.state.panelPosition}>
                <NewSlider
                  min={35}
                  values={area}
                  max={500}
                  isRange
                  onChange={this.sliderChanged.bind(this, 'area')}
                  valuesFormatter={(value) => `${value} m²`}
                />
              </FilterPanel>
              <FilterPanel show={this.state.showPrice} panelPosition={this.state.panelPosition}>
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
              <FilterPanel show={this.state.showRooms} panelPosition={this.state.panelPosition}>
                <NewSlider
                  values={rooms}
                  min={1}
                  max={8}
                  isRange
                  onChange={this.sliderChanged.bind(this, 'rooms')}
                />
              </FilterPanel>
              <FilterPanel show={this.state.showGarage} panelPosition={this.state.panelPosition}>
                <NewSlider
                  min={0}
                  values={garageSpots}
                  max={8}
                  isRange
                  onChange={this.sliderChanged.bind(this, 'garageSpots')}
                />
              </FilterPanel>
            </Row>
          )
        }}
      </Query>
    )
  }
}
