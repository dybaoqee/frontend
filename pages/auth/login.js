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
    errors: []
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
    this.setState({errors: []})

    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    let errors = await signIn(email, password)

    if (errors) {
      errors = errors && _.isArray(errors) ? errors : [errors]
      this.setState({errors})
    }
  }

  render() {
    const {errors} = this.state

    return (
      <Layout>
        <Form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />

          <EmCasaButton full type="submit">
            Enviar
          </EmCasaButton>
          <Errors errors={errors} />
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
