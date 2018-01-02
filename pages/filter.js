import { Component } from 'react'
import Router from 'next/router'

import { getNeighborhoods } from '../services/neighborhood-api'

export default class Filter extends Component {
  static async getInitialProps(context) {
    const res = await getNeighborhoods()

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
    }

    if (!res.data) {
      return res
    }

    return {
      neighborhoods: res.data.neighborhoods
    }

  }

  handleNeighborhoodChange = (e) => {
    const neighborhood = e.target.value
    Router.push(`/?bairro=${neighborhood}`).then(() => window.scrollTo(0, 0))
  }

  render() {
    const { neighborhoods } = this.props

    return <div>
      <h1>Bairros</h1>

      <select onChange={this.handleNeighborhoodChange}>
      {neighborhoods && neighborhoods.map((neighborhood, i) => {
        return <option key={i} label={neighborhood} value={neighborhood}/>
      })}
      </select>
    </div>
  }
}
