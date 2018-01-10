import { Component } from 'react'
import Router from 'next/router'
import NumberFormat from 'react-number-format'

import * as colors from '../../../constants/colors'

export default class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      areFiltersVisible: false,
      bairros: {}
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
    const that = this

    return Object.keys(this.state).map(function(key) {
      if (key === 'areFiltersVisible') return null

      const flattenedValue = that.joinParam(that.state[key])
      return (flattenedValue === '') ? null : `${key}=${flattenedValue}`
    }).filter(n => n).join('&')
  }

  updateFilter = () => {
    const params = this.treatParams()

    if (params) {
      Router.push(`/?${params}`)
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
    const { preco_minimo, preco_maximo, area_minima, area_maxima, quartos } = query
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
                renderText={value => <option value={option}>{value}</option>}
                displayType={'text'}
                thousandSeparator={'.'}
                prefix={'R$'}
                decimalSeparator={','} />
            })}
          </select>
        </div>

        {!!areFiltersVisible && <span onClick={this.handleToggleFilterVisibility}>
          Ver Menos Filtros<span>›</span>
        </span>}

        {!areFiltersVisible && <span onClick={this.handleToggleFilterVisibility}>
          Ver Mais Filtros<span>‹</span>
        </span>}
      </div>


      {!!areFiltersVisible && <div>
        <div>
          <label>Área</label>
          <select name="area_minima" onChange={this.handleInputChange} defaultValue={area_minima}>
            <option value="">sem mínimo</option>
            {minAreaOptions.map(function(option) {
              return <NumberFormat
                value={option}
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
              return <div key={i} className="neighborhood">
                <input type="checkbox" value={bairro} onClick={this.handleNeighborhoodChange} />
                <label>{bairro}</label>
              </div>
            })}
          </div>
        </div>
      </div>}

      <style jsx>{`
        div.container {
          border-bottom: 1px solid ${colors.lightGray};
          overflow: auto;
          > div {
            display: block;
            &.price-container {
              align-items: center;
              display: flex;
              justify-content: space-between;
              span {
                  color: ${colors.blue};
                  cursor: pointer;
                  float: right;
                  margin-right: 20px;
                  > span {
                    margin-left: 5px;
                    transform: rotate(-90deg);
                  }
                }
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
            padding: 0;
            label {
              max-width: calc(100% - 35px);
            }
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
      `}</style>
    </div>
  }
}
