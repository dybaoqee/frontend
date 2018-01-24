import { Component } from 'react'
import Link from 'next/link'

import Layout from '../../components/main-layout'
import OneColumnForm from '../../components/one-column-form'
import Error from '../../components/error'
import { getCookie, removeCookie } from '../../lib/session'
import { signIn, signUp, redirectIfAuthenticated } from '../../lib/auth'

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

    const name = e.target.elements.name.value
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value

    const error = await signUp(name, email, password)

    if (error) {
      console.log(error)
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
            <h1>Cadastre-se</h1>

            <div className="control-group">
              <input type="text" placeholder="Nome" name="name" />
            </div>

            <div className="control-group">
              <input type="email" placeholder="Email" name="email" />
            </div>

            <div className="control-group">
              <input type="password" placeholder="Senha" name="password" />
            </div>

            <button type="submit">Enviar</button>
          </OneColumnForm>
        </div>
      </Layout>
    )
  }
}
