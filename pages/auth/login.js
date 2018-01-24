import { Component } from 'react'
import Link from 'next/link'

import Layout from '../../components/main-layout'
import OneColumnForm from '../../components/one-column-form'
import Error from '../../components/error'
import { getCookie, removeCookie } from '../../lib/session'
import { signIn, redirectIfAuthenticated } from '../../lib/auth'

export default class Login extends Component {
  state = {
    error: null
  }

  static getInitialProps(ctx) {
    if (redirectIfAuthenticated(ctx)) {
      return {}
    } else {
      const success = getCookie("success", ctx.req)

      if (success) {
        removeCookie("success")
      }
      return {
        success
      }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target.elements.email.value
    const password = e.target.elements.password.value

    const error = await signIn(email, password)

    if (error) {
      this.setState({
        error
      })
      return false
    }
  }

  render() {
    const { url, success } = this.props
    const { error } = this.state

    return (
      <Layout>
        <div>
          <OneColumnForm handleSubmit={this.handleSubmit}>
            <h1>Login</h1>

            <div className="control-group">
              <input type="email" placeholder="email" name="email" />
            </div>

            <div className="control-group">
              <input type="password" placeholder="password" name="password" />
            </div>

            <button type="submit">Enviar</button>

            <p>
              {"Não tem cadastro? "}
              <Link href="/auth/signup" as="/signup">
                <a>Cadastre-se</a>
              </Link>
            </p>
          </OneColumnForm>

        </div>
      </Layout>
    )
  }
}
