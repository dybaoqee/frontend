import { Component } from 'react'
import Router from 'next/router'

import { getNeighborhoods } from '../services/neighborhood-api'

export default class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bairros: {}
    }
  }

  static async getInitialProps(context) {
    const res = await getNeighborhoods()

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
    }

    if (!res.data) {
      return res
    }

    return {
      bairros: res.data.neighborhoods
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


  render() {
    const { bairros } = this.props

    return <div>
      <h1>Bairros</h1>

      {bairros && bairros.map((bairro, i) => {
        return <div key={i}>
          <input type="checkbox" value={bairro} onClick={this.handleNeighborhoodChange} />
          <label>{bairro}</label>
        </div>
      })}

      <div>
        <label>Preço Mínimo</label>
        <input type="text" name="preco_minimo" onChange={this.handleInputChange} />
      </div>

      <div>
        <label>Preço Máximo</label>
        <input type="text" name="preco_maximo" onChange={this.handleInputChange} />
      </div>

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
      <style jsx>{`
        div,
        button {
          clear: both;
          float: left;
          margin: 10px 0;
        }
      `}</style>

      <button onClick={this.handleSubmit}>Go</button>
    </div>
  }
}
