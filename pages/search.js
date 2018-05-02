import {Component} from 'react'
import Link from 'next/link'

import Layout from 'components/shared/Shell'
import Form from 'components/auth/Form'
import {redirectIfNotAuthenticated, getJwt, isAuthenticated} from 'lib/auth'
import {getCookie, removeCookie} from 'lib/session'
import {searchText} from 'services/search-api'

export default class Search extends Component {
  state = {
    error: null
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
      results: error.data.results
    })
  }

  render() {
    const {jwt} = this.props
    const {results} = this.state

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
            {results &&
              results.map((listing, l) => {
                return (
                  <Link
                    href={`/listings/id=${listing.id}`}
                    as={`/imoveis/${listing.id}`}
                  >
                    <a className="btn gray cancel-listing-nav">{listing.id}</a>
                  </Link>
                )
              })}
          </div>
        </div>
      </Layout>
    )
  }
}
