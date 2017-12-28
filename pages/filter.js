import { Component } from 'react'

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

  render() {
    const { neighborhoods } = this.props

    return <div>
      <h1>Bairros</h1>

      <select>
      {neighborhoods && neighborhoods.map((neighborhood, i) => {
        return <option key={i} label={neighborhood}/>
      })}
      </select>
    </div>
  }
}
