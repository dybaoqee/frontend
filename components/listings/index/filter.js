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

    const bairrosObject = bairrosArray.reduce(function(previous, bairro) {
      previous[bairro] = true
      return previous
    }, {})

    this.state = {
      areFiltersVisible: false,
      preco_minimo: preco_minimo,
      preco_maximo: preco_maximo,
      area_minima: area_minima,
      area_maxima: area_maxima,
      quartos: quartos,
      bairros: bairrosObject
    }
  }

  updateSelectedOption = (selectedOption, stateKey) => {
    const value = (selectedOption && selectedOption.value) ? selectedOption.value : null
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

  // handleNeighborhoodChange = (e) => {
  //   const { bairros } = this.state

  //   if (bairros[e.target.value] == true) {
  //     delete bairros[e.target.value]
  //   } else {
  //     bairros[e.target.value] = true
  //   }

  //   this.setState({ bairros: bairros })

  //   this.updateFilter()
  // }

  joinParam = (param) => {
    if (param !== null && typeof param === 'object') {
      return Object.keys(param).map(function(key) {
        return key
      }).join('|')
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
    const { preco_minimo, preco_maximo, area_minima, area_maxima, quartos, bairros } = this.state

    const { areFiltersVisible } = this.state

    return <div className="container">
      <span className="filter-title">Filtros</span>

      <div className="option-container price-container">
        <label>De</label>

        <Select
          name="form-field-name"
          style={{width: 160}}
          placeholder="R$"
          value={preco_minimo}
          onChange={this.handleMinPriceChange}
          options={filterOptions.minPriceOptions} />

        <label>a</label>

        <Select
          name="form-field-name"
          style={{width: 160}}
          placeholder="R$"
          value={preco_maximo}
          onChange={this.handleMaxPriceChange}
          options={filterOptions.maxPriceOptions} />
      </div>

      <div className="option-container">
        <label>De</label>

        <Select
          name="form-field-name"
          style={{width: 100}}
          placeholder="m²"
          value={area_minima}
          onChange={this.handleMinAreaChange}
          options={filterOptions.minAreaOptions} />

        <label>a</label>

        <Select
          name="form-field-name"
          style={{width: 100}}
          placeholder="m²"
          value={area_minima}
          onChange={this.handleMinAreaChange}
          options={filterOptions.minAreaOptions} />
      </div>

      <div className="option-container">
        <label>Quartos</label>
        <Select
          name="form-field-name"
          placeholder="Quartos"
          value={quartos}
          onChange={this.handleRoomChange}
          options={filterOptions.roomNumberOptions} />
      </div>

      <div className="option-container">
        <label className="neighborhood">Bairros</label>
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
        .Select {
          min-width: 180px;
        }
      `}</style>

      <style jsx>{`
        div.container {
          align-items: center;
          background: white;
          border-bottom: 1px solid ${colors.lightGray};
          border-top: 1px solid ${colors.lightGray};
          display: flex;
          justify-content: flex-start;
          position: fixed;
          width: 100vw;
          z-index: 4;
        }

        div.option-container {
          align-items: center;
          display: flex;
          flex-wrap: nowrap;
          margin-right: 40px;
          label {
            color: ${colors.lightGray};
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
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
