import {Component} from 'react'
import ReactGA from 'react-ga'
import Router from 'next/router'
import Select from 'react-select'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

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

  handleClick = () => {
    const params = this.treatParams()

    if (params) {
      ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
      ReactGA.event({
        category: 'Search',
        label: 'User search from Home',
        action: 'homeSearch'
      })

      Router.push(`/listings/index?${params}`, `/imoveis?${params}`).then(() =>
        window.scrollTo(0, 0)
      )
    } else {
      Router.push('/listings/index', '/imoveis').then(() =>
        window.scrollTo(0, 0)
      )
    }
  }

  render() {
    const {bairros} = this.state
    const {neighborhoods} = this.props
    const neighborhoodOptions = filterOptions.neighborhoodOptions(neighborhoods)

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
          <Magnifier onClick={this.handleClick}>
            <FontAwesomeIcon icon={faSearch} />
          </Magnifier>
          <MobileMagnifier onClick={this.handleClick}>
            Ver Imóveis →
          </MobileMagnifier>
        </Search>
      </Container>
    )
  }
}
