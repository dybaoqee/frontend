import {Component} from 'react'
import Link from 'next/link'

import Layout from 'components/shared/Shell'
import Form from 'components/shared/Common/Form'
import Errors from 'components/shared/Common/Errors'
import EmCasaButton from 'components/shared/Common/Buttons'
import {getCookie, removeCookie} from 'lib/session'
import {signIn, redirectIfAuthenticated} from 'lib/auth'
import _ from 'lodash'

export default class Login extends Component {
  state = {
    errors: [],
    loading: false
  }

  static getInitialProps(ctx) {
    if (redirectIfAuthenticated(ctx)) {
      return {}
    } else {
      const success = getCookie('success', ctx.req)

      if (success) {
        removeCookie('success')
      }
      return {
        success
      }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({errors: [], loading: true})
    const {url} = this.props

    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    let errors = await signIn(email, password, url)

    if (errors) {
      errors = errors && _.isArray(errors) ? errors : [errors]
      this.setState({errors})
    }

    this.setState({loading: false})
  }

  render() {
    const {errors, loading} = this.state

    return (
      <Layout>
        <Form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Senha" name="password" />

          <EmCasaButton disabled={loading} full type="submit">
            {loading ? 'Aguarde...' : 'Enviar'}
          </EmCasaButton>
          <Errors errors={errors} />
          <p>
            <Link href="/auth/password_recovery" as="/lembrar_senha">
              <a>Esqueci minha senha</a>
            </Link>
          </p>
          <p>
            {'Não tem cadastro? '}
            <Link href="/auth/signup" as="/signup">
              <a>Cadastre-se</a>
            </Link>
          </p>
        </Form>
      </Layout>
    )
  }
}
