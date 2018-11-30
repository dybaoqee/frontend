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
  Overlay,
  FilterButton,
  Filters,
  FilterContainer,
  PropertyTypes,
  PropertyType,
  FiltersWrapper
} from './styles'
import Slider from 'components/shared/Common/Slider'
import Select from 'react-select'
import EmCasaButton from 'components/shared/Common/Buttons'
import {neighborhoodOptions} from 'constants/listing-filter-options'
import {Query} from 'react-apollo'
import {GET_NEIGHBORHOODS} from 'graphql/listings/queries'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'

export default class Filter extends Component {
  constructor(props) {
    super(props)
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
      active: false,
      values: initialValues
    }
  }

  onClose = () => this.setState({active: false})

  onToggle = () => {
    const {active} = this.state
    this.setState({active: !active})
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

  render() {
    const {
      active,
      values: {
        area,
        price,
        garageSpots,
        rooms,
        types,
        neighborhoods: selectedNeighborhoods
      }
    } = this.state

    const {onChangeListingType, onToggle, activeFilters, resetFilter} = this

    return (
      <Query query={GET_NEIGHBORHOODS} ssr={false}>
        {({data: {neighborhoods = []}}) => {
          const neighborhoodsOptions = neighborhoodOptions(neighborhoods)
          return (
            <Container>
              <Row flexDirection="row" flexWrap="wrap">
                <FilterButton>Tipos de imóveis</FilterButton>
                <FilterButton>Área</FilterButton>
                <FilterButton>Valor</FilterButton>
                <FilterButton>Quartos</FilterButton>
                <FilterButton>Vagas de garagem</FilterButton>
              </Row>
              <FiltersWrapper active={active}>
                <Filters>
                  <div>
                    <FilterContainer>
                      <h4>
                        Tipo de Imóvel
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={resetFilter.bind(this, 'types')}
                        />
                      </h4>
                      <PropertyTypes activeTypes={types}>
                        <PropertyType
                          aria-label="Apartamento"
                          onClick={onChangeListingType}
                        >
                          <FontAwesomeIcon icon={faBuilding} />
                          <span>Apartamento</span>
                        </PropertyType>
                        <PropertyType
                          aria-label="Casa"
                          onClick={onChangeListingType}
                        >
                          <FontAwesomeIcon icon={faHome} />
                          <span>Casa</span>
                        </PropertyType>
                        <PropertyType
                          aria-label="Cobertura"
                          onClick={onChangeListingType}
                        >
                          <FontAwesomeIcon icon={faRoof} />
                          <span>Cobertura</span>
                        </PropertyType>
                      </PropertyTypes>
                    </FilterContainer>
                    <FilterContainer>
                      <h4>
                        Bairros
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={resetFilter.bind(this, 'neighborhoods')}
                        />
                      </h4>
                      <Select
                        name="form-field-name"
                        arrowRenderer={null}
                        placeholder="Selecione"
                        multi={true}
                        value={selectedNeighborhoods || []}
                        onChange={this.neighborhoodChanged}
                        options={neighborhoodsOptions}
                        noResultsText="Resultado Não Encontrado"
                      />
                    </FilterContainer>
                    <FilterContainer>
                      <h4>
                        Preço
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={resetFilter.bind(this, 'price')}
                        />
                      </h4>
                      <Slider
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
                    </FilterContainer>
                    <FilterContainer>
                      <h4>
                        Área
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={resetFilter.bind(this, 'area')}
                        />
                      </h4>
                      <Slider
                        min={35}
                        values={area}
                        max={500}
                        isRange
                        onChange={this.sliderChanged.bind(this, 'area')}
                        valuesFormatter={(value) => `${value} m²`}
                      />
                    </FilterContainer>
                    <FilterContainer>
                      <h4>
                        Quartos
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={resetFilter.bind(this, 'rooms')}
                        />
                      </h4>
                      <Slider
                        values={rooms}
                        min={1}
                        max={8}
                        isRange
                        onChange={this.sliderChanged.bind(this, 'rooms')}
                      />
                    </FilterContainer>
                    <FilterContainer>
                      <h4>
                        Vagas
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={resetFilter.bind(this, 'garageSpots')}
                        />
                      </h4>
                      <Slider
                        min={0}
                        values={garageSpots}
                        max={8}
                        isRange
                        onChange={this.sliderChanged.bind(this, 'garageSpots')}
                      />
                    </FilterContainer>
                  </div>
                  <EmCasaButton full light onClick={this.onClose}>
                    Ver resultados
                  </EmCasaButton>
                </Filters>
              </FiltersWrapper>
            </Container>
          )
        }}
      </Query>
    )
  }
}
