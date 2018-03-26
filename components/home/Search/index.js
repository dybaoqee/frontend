import {Component} from 'react'
import ReactGA from 'react-ga'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import Link from 'next/link'

import * as filterOptions from 'constants/listing-filter-options'

import Container, {
  Search,
  Neighborhoods,
  Magnifier,
  MobileMagnifier
} from './styles'

export default class HomeSearch extends Component {
  state = {}

  updateSelectedOption = (selectedOption, stateKey) => {
    const value =
      selectedOption && selectedOption.value ? selectedOption.value : null
    const state = this.state
    state[stateKey] = value
    this.setState(state)
  }

  handleRoomChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'quartos')
  }

  handleMinPriceChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'preco_minimo')
  }

  handleMaxPriceChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'preco_maximo')
  }

  handleNeighborhoodChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'bairros')
  }

  joinParam = (param) => {
    if (param !== null && typeof param === 'object') {
      return Object.keys(param)
        .map(function(key) {
          return key
        })
        .join('|')
    } else {
      return param
    }
  }

  treatParams = () => {
    const {state, joinParam} = this

    return Object.keys(state)
      .map(function(key) {
        if (key === 'areFiltersVisible') return null
        if (state[key] === undefined) return null

        const flattenedValue = joinParam(state[key])
        return flattenedValue === '' ? null : `${key}=${flattenedValue}`
      })
      .filter((n) => n)
      .join('&')
  }

  buildLink = () => {
    const params = this.treatParams()

    if (params) {
      return {href: `/listings/index?${params}`, as: `/imoveis?${params}`}
    } else {
      return {href: '/listings/index', as: '/imoveis'}
    }
  }

  handleClick = () => {
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
    ReactGA.event({
      category: 'Search',
      label: 'User search from Home',
      action: 'homeSearch'
    })
  }

  render() {
    const {bairros} = this.state
    const {neighborhoods} = this.props
    const neighborhoodOptions = filterOptions.neighborhoodOptions(neighborhoods)
    const {href, as} = this.buildLink()

    return (
      <Container>
        <h1>Encontre o Imóvel Perfeito para Você no Rio de Janeiro</h1>

        <Search>
          <Neighborhoods>
            <Select
              name="form-field-name"
              arrowRenderer={null}
              placeholder="Bairro"
              value={bairros}
              onChange={this.handleNeighborhoodChange}
              options={neighborhoodOptions}
              noResultsText="Não Encontramos Resultado"
            />
          </Neighborhoods>
          <Link href={href} as={as} prefetch>
            <Magnifier onClick={this.handleClick}>
              <FontAwesomeIcon icon={faSearch} />
            </Magnifier>
          </Link>
          <Link href={href} as={as}>
            <MobileMagnifier onClick={this.handleClick}>
              Ver Imóveis →
            </MobileMagnifier>
          </Link>
        </Search>
      </Container>
    )
  }
}
