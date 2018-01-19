import { Component } from 'react'
import Router from 'next/router'
import NumberFormat from 'react-number-format'

import * as colors from '../../../constants/colors'
import { mobileMedia } from '../../../constants/media'

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

  handleNeighborhoodChange = (e) => {
    const { bairros } = this.state

    if (bairros[e.target.value] == true) {
      delete bairros[e.target.value]
    } else {
      bairros[e.target.value] = true
    }

    this.setState({ bairros: bairros })

    this.updateFilter()
  }

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

    const minPriceOptions = [750000, 1000000, 2000000, 3000000, 5000000]
    const maxPriceOptions = [1000000, 2000000, 3000000, 5000000, 10000000]
    const minAreaOptions = [50, 80, 100, 150, 200, 300, 500, 1000]
    const maxAreaOptions = [50, 80, 100, 150, 200, 300, 500, 1000, 2000]
    const roomNumberOptions = [1, 2, 3, 4, 5]

    return <div className="container">
      <div className="price-container">
        <div>
          <label>Preço</label>
          <select name="preco_minimo" onChange={this.handleInputChange} defaultValue={preco_minimo}>
            <option value="">sem mínimo</option>

            {minPriceOptions.map(function(option) {
              return <NumberFormat
                value={option}
                key={option}
                renderText={value => <option value={option}>{value}</option>}
                displayType={'text'}
                thousandSeparator={'.'}
                prefix={'R$'}
                decimalSeparator={','} />
            })}
          </select>

          <label>a</label>

          <select name="preco_maximo" onChange={this.handleInputChange} defaultValue={preco_maximo}>
            <option value="">sem máximo</option>
            {maxPriceOptions.map(function(option) {
              return <NumberFormat
                value={option}
                key={option}
                renderText={value => <option value={option}>{value}</option>}
                displayType={'text'}
                thousandSeparator={'.'}
                prefix={'R$'}
                decimalSeparator={','} />
            })}
          </select>
        </div>

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

      {!!areFiltersVisible && <div>
        <div>
          <label>Área</label>
          <select name="area_minima" onChange={this.handleInputChange} defaultValue={area_minima}>
            <option value="">sem mínimo</option>
            {minAreaOptions.map(function(option) {
              return <NumberFormat
                value={option}
                key={option}
                renderText={value => <option value={option}>{value}</option>}
                displayType={'text'}
                thousandSeparator={'.'}
                suffix={'m²'}
                decimalSeparator={','} />
            })}
          </select>

          <label>a</label>

          <select name="area_maxima" onChange={this.handleInputChange} defaultValue={area_maxima}>
            <option value="">sem máximo</option>
            {maxAreaOptions.map(function(option) {
              return <NumberFormat
                value={option}
                key={option}
                renderText={value => <option value={option}>{value}</option>}
                displayType={'text'}
                thousandSeparator={'.'}
                suffix={'m²'}
                decimalSeparator={','} />
            })}
          </select>
        </div>

        <div>
          <label>Quartos</label>
          <select name="quartos" onChange={this.handleInputChange} defaultValue={quartos}>
            <option value=""></option>
            {roomNumberOptions.map(function(option) {
              return <NumberFormat
                value={option}
                key={option}
                renderText={value => <option value={option}>{value}</option>}
                displayType={'text'}/>
            })}
            })}
          </select>
        </div>

        <div>
          <label className="neighborhood">Bairros</label>

          <div className="select-container">
            {neighborhoods && neighborhoods.map((bairro, i) => {
              const checked = bairros[bairro] === true

              return <div key={i} className="neighborhood">
                <input type="checkbox"
                       value={bairro}
                       checked={checked}
                       onClick={this.handleNeighborhoodChange} />
                <label>{bairro}</label>
              </div>
            })}
          </div>
        </div>
      </div>}

      <style jsx>{`
        div.container {
          background: white;
          border-bottom: 1px solid ${colors.lightGray};
          border-top: 1px solid ${colors.lightGray};
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          overflow: auto;
          position: fixed;
          width: 100vw;
          z-index: 4;
          > div {
            flex: 0 0 100%;
            &.price-container {
              align-items: center;
              display: flex;
              flex: 0 0 calc(100% - 170px);
              justify-content: space-between;
            }
            div {
              padding: 10px;
            }
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
            width: 70px;
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
