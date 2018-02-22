import { Component } from 'react'
import Link from 'next/link'

import Layout from 'components/shared/Shell'
import Form from 'components/auth/Form'
import {redirectIfNotAuthenticated, getJwt, isAuthenticated} from 'lib/auth'
import { getCookie, removeCookie } from 'lib/session'
import { searchText} from 'services/search-api'

export default class Search extends Component {
  state = {
    error: null,
  }

  static getInitialProps(ctx) {
    if (redirectIfNotAuthenticated(ctx)) {
      return {}
    }

    const jwt = getJwt(ctx)

    return {
      jwt: jwt
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const {jwt} = this.props
    const searchString = e.target.elements.searchString.value

    const error = await searchText(searchString, jwt)

    this.setState({
        listings: error.data.listings
    })
  }

  render() {
    const {jwt} = this.props
    const {listings} = this.state

    return (
      <Layout>
        <div>
          <Form handleSubmit={this.handleSubmit}>
            <h1>Busca</h1>

            <div className="control-group">
              <input type="text" placeholder="Busque" name="searchString" />
            </div>

            <button type="submit">Enviar</button>
          </Form>
          <div className="images-container">
            {listings &&
              listings.map((listing, l) => {
                return (
                  <div key={listing.id}>{listing.id}</div>
                )
              })}
          </div>
        </div>
      </Layout>
    )
  }
}
