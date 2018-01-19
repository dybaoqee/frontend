import { Component } from 'react'
import Router from 'next/router'
import Select from 'react-select'
import NumberFormat from 'react-number-format'

import * as colors from '../../../constants/colors'
import { mobileMedia } from '../../../constants/media'
import * as filterOptions from '../../../constants/listing-filter-options'

export default class Filter extends Component {
  constructor(props) {
    super(props)

    const { preco_minimo, preco_maximo, area_minima, area_maxima, quartos, bairros } = props.query
    const bairrosArray = bairros ? bairros.split('|') : []

    this.state = {
      areFiltersVisible: false,
      preco_minimo: preco_minimo,
      preco_maximo: preco_maximo,
      area_minima: area_minima,
      area_maxima: area_maxima,
      quartos: quartos,
      bairros: bairrosArray
    }
  }

  updateSelectedOption = (selectedOption, stateKey) => {
    const value = (selectedOption && selectedOption.value) ? selectedOption.value : null
    const state = this.state
    state[stateKey] = value
    this.setState(state)

    this.updateFilter()
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

  handleMinAreaChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'area_minima')
  }

  handleMaxAreaChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'area_maxima')
  }

  handleNeighborhoodChange = (value) => {
    console.log(value);
    this.setState({ bairros: value })
    console.log(this.state)
    this.updateFilter()
  }

  joinParam = (param) => {
    if (Array.isArray(param)) {
      return param.join('|')
    } else {
      return param
    }
  }

  treatParams = () => {
    const { state, joinParam } = this

    return Object.keys(state).map(function(key) {
      if (key === 'areFiltersVisible') return null
      if (state[key] === undefined) return null

      const flattenedValue = joinParam(state[key])
      return (flattenedValue === '') ? null : `${key}=${flattenedValue}`
    }).filter(n => n).join('&')
  }

  updateFilter = () => {
    const params = this.treatParams()

    if (params) {
      Router.push(`/listings/index?${params}`, `/imoveis?${params}`)
    }
  }

  handleInputChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)

    this.updateFilter()
  }

  handleToggleFilterVisibility = () => {
    const state = this.state
    state.areFiltersVisible = !state.areFiltersVisible
    this.setState(state)
  }

  render() {
    const { neighborhoods, query } = this.props
    const neighborhoodOptions = filterOptions.neighborhoodOptions(neighborhoods)
    const { preco_minimo, preco_maximo, area_minima, area_maxima, quartos, bairros } = this.state

    const { areFiltersVisible } = this.state

    return <div className="container">
      <span className="filter-title">Filtros</span>

      <div className="option-container price-container">
        <label>De</label>

        <Select
          name="form-field-name"
          arrowRenderer={null}
          style={{width: 130}}
          placeholder="R$"
          value={preco_minimo}
          onChange={this.handleMinPriceChange}
          options={filterOptions.minPriceOptions}
          searchable={false} />

        <label>a</label>

        <Select
          name="form-field-name"
          arrowRenderer={null}
          style={{width: 130}}
          placeholder="R$"
          value={preco_maximo}
          onChange={this.handleMaxPriceChange}
          options={filterOptions.maxPriceOptions}
          searchable={false} />
      </div>

      <div className="option-container">
        <label>De</label>

        <Select
          name="form-field-name"
          arrowRenderer={null}
          style={{width: 100}}
          placeholder="m²"
          value={area_minima}
          onChange={this.handleMinAreaChange}
          options={filterOptions.minAreaOptions}
          searchable={false} />

        <label>a</label>

        <Select
          name="form-field-name"
          arrowRenderer={null}
          style={{width: 100}}
          placeholder="m²"
          value={area_maxima}
          onChange={this.handleMaxAreaChange}
          options={filterOptions.maxAreaOptions}
          searchable={false} />
      </div>

      <div className="option-container">
        <Select
          name="form-field-name"
          arrowRenderer={null}
          style={{width: 130}}
          placeholder="Nº Quartos"
          value={quartos}
          onChange={this.handleRoomChange}
          options={filterOptions.roomNumberOptions}
          searchable={false} />
      </div>

      <div className="option-container">
        <Select
          name="form-field-name"
          arrowRenderer={null}
          style={{width: 200}}
          placeholder="Bairros"
          multi={true}
          value={bairros}
          onChange={this.handleNeighborhoodChange}
          options={neighborhoodOptions}
          searchable={false} />
      </div>

      {!!areFiltersVisible &&
      <span
        className="toggleFilterVisibility"
        onClick={this.handleToggleFilterVisibility}
      >
        Ver Menos Filtros<span>›</span>
      </span>}

      {!areFiltersVisible &&
      <span
        className="toggleFilterVisibility"
        onClick={this.handleToggleFilterVisibility}
      >
        Ver Mais Filtros<span>‹</span>
      </span>}

      <style global jsx>{`
        .Select-control {
          border-color: ${colors.blue};
        }

        .Select-placeholder {
          color: ${colors.mediumGray};
          text-align: center;
        }

        .Select.has-value.is-clearable.Select--single > .Select-control .Select-value {
          padding-right: 20px;
        }
      `}</style>

      <style jsx>{`

        div.container {
          align-items: center;
          background: white;
          border-bottom: 1px solid ${colors.lightGray};
          border-top: 1px solid ${colors.lightGray};
          display: flex;
          padding: 10px 0;
          position: fixed;
          width: 100vw;
          z-index: 4;
        }

        div.option-container {
          align-items: center;
          display: flex;
          margin-right: 40px;
          label {
            color: ${colors.blue};
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
          }

          label:last-of-type {
            margin: 0 10px;
          }
        }

        div.container .select-container {
          display: grid;
          grid-template-columns: 200px 200px 200px;
          div.neighborhood {
            align-items: center;
            display: flex;
            float: left;
            padding: 6px 0;
            label {
              width: calc(100% - 35px);
            }
          }
        }

        span.filter-title {
          color: ${colors.mediumDarkGray};
          padding-left: 20px;
          padding-right: 30px;
        }

        span.toggleFilterVisibility {
          color: ${colors.blue};
          cursor: pointer;
          padding-top: 13px;
          margin-right: 20px;
          text-align: right;
          > span {
            display: inline-block;
            margin-left: 5px;
            transform: rotate(-90deg);
          }
        }

        label {
          margin-right: 10px;
          &.neighborhood {
            clear: both;
            float: left;
            width: 100% !important;
          }
          &:first-of-type {
            display: inline-block;
          }
        }

        input {
          margin-right: 10px;
          padding: 10px;
        }

        select {
          margin-right: 10px;
        }

        button {
          clear: both;
          float: right;
          font-size: 18px;
          margin: 10px 20px;
          padding: 7px 20px 10px;
        }

        span.toggleFilterVisibility {
          display: none;
        }

        @media ${mobileMedia} {
          div.container {
            flex-direction: column;
          }

          span.toggleFilterVisibility {
            display: inline;
            flex: 100%;
            margin-bottom: 10px;
            margin-right: 0;
            order: 99;
            text-align: center;
          }

          div.container .select-container {
            display: grid;
            grid-template-columns: 50% 50%;
          }

          label {
            font-size: 13px;
            &:first-of-type {
              width: 50px;
            }
          }
        }
      `}</style>
    </div>
  }
}
