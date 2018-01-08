import { Component } from 'react'
import Router from 'next/router'

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
      const flattenedValue = that.joinParam(that.state[key])
      return (flattenedValue === '') ? null : `${key}=${flattenedValue}`
    }).join('&')
  }

  handleSubmit = () => {
    const { bairros } = this.state
    const params = this.treatParams()

    if (params) {
      Router.push(`/?${params}`).then(() => window.scrollTo(0, 0))
    }
  }

  handleInputChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  handleToggleFilterVisibility = () => {
    const state = this.state
    state.areFiltersVisible = !state.areFiltersVisible
    this.setState(state)
  }

  render() {
    const { neighborhoods } = this.props
    const { areFiltersVisible } = this.state

    console.log(areFiltersVisible);

    return <div className="container">
      <div className="price-container">
        <div>
          <label>Preço</label>
          <input type="text" name="preco_minimo" onChange={this.handleInputChange} />
          <label>a</label>
          <input type="text" name="preco_maximo" onChange={this.handleInputChange} />
        </div>

        {!!areFiltersVisible && <span onClick={this.handleToggleFilterVisibility}>
          Menos Filtros<span>›</span>
        </span>}

        {!areFiltersVisible && <span onClick={this.handleToggleFilterVisibility}>
          Mais Filtros<span>‹</span>
        </span>}
      </div>


      {!!areFiltersVisible && <div>
        {neighborhoods && neighborhoods.map((bairro, i) => {
          return <div key={i}>
            <input type="checkbox" value={bairro} onClick={this.handleNeighborhoodChange} />
            <label>{bairro}</label>
          </div>
        })}


        <div>
          <label>Área Mínima</label>
          <input type="text" name="area_minima" onChange={this.handleInputChange} />
        </div>

        <div>
          <label>Área Máxima</label>
          <input type="text" name="area_maxima" onChange={this.handleInputChange} />
        </div>

        <div>
          <label>Quartos</label>
          <input type="text" name="quartos" onChange={this.handleInputChange} />
        </div>

        <button onClick={this.handleSubmit}>Go</button>
      </div>}

      <style jsx>{`
        div.container {
          border-bottom: 1px solid ${colors.lightGray};
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

        label {
          margin-right: 10px;
        }

        input {
          margin-right: 10px;
          padding: 10px;
        }

        button {
          clear: both;
          float: left;
          margin: 10px 0;
        }
      `}</style>
    </div>
  }
}
