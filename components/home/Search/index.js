import {Component} from 'react'
import ReactGA from 'react-ga'
import Router from 'next/router'
import Select from 'react-select'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import * as filterOptions from 'constants/listing-filter-options'
import {imageUrl} from 'utils/image_url'

import Container, {Search, Neighborhoods} from './styles'

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
        action: 'homeSearch',
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
    const {quartos, preco_minimo, preco_maximo, bairros} = this.state
    const {neighborhoods} = this.props
    const neighborhoodOptions = filterOptions.neighborhoodOptions(neighborhoods)

    return (
      <Container>
        <h1>Encontre o Imóvel Perfeito para Você no Rio de Janeiro</h1>

        <Search>
          <div>
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
            <div className="magnifier-container" onClick={this.handleClick}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
          <div
            className="mobile-magnifier-container"
            onClick={this.handleClick}
          >
            Ver Imóveis →
          </div>
        </Search>

        <style global jsx>{`
          .search .Select-control {
            background: transparent;
            border: none;
            height: 45px;

            .Select-placeholder {
              align-items: center;
              display: flex;
            }
            .Select-value {
              align-items: center;
              display: flex;
            }
            .Select-input {
              padding-top: 7px;
            }
          }
        `}</style>
        <style jsx>{`
          div.magnifier-container {
            align-items: center;
            background: ${colors.blue};
            border-top-right-radius: 9px;
            cursor: pointer;
            display: flex;
            height: 44px;
            justify-content: center;
            width: 60px;
            &:hover {
              background: ${colors.darkenedBlue};
            }
            :global(svg) {
              height: 20px;
              width: 40px;
            }
            :global(svg path) {
              fill: white;
            }
          }

          div.mobile-magnifier-container {
            display: none;
          }

          @media ${mobileMedia} {
            div.neighborhoods,
            div.mobile-magnifier-container {
              border-radius: 8px;
              width: 100%;
            }

            div.magnifier-container {
              display: none;
            }

            div.search > div > div.mobile-magnifier-container {
              align-items: center;
              background: ${colors.blue};
              color: white;
              cursor: pointer;
              display: flex;
              justify-content: center;
              &:hover {
                background: ${colors.darkenedBlue};
              }
            }
          }
        `}</style>
      </Container>
    )
  }
}
