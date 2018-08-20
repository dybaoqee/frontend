import {Component, Fragment} from 'react'
import Link from 'next/link'
import Form from 'components/shared/Common/Form'
import Errors from 'components/shared/Common/Errors'
import EmCasaButton from 'components/shared/Common/Buttons'
import {getCookie, removeCookie} from 'lib/session'
import {redefinePassword, redirectIfAuthenticated} from 'lib/auth'
import isArray from 'lodash/isArray'
import flattenDeep from 'lodash/flattenDeep'

export default class PasswordRecovery extends Component {
  state = {
    errors: [],
    loading: false,
    data: {}
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
        success,
        renderFooter: false
      }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({errors: [], loading: true})
    const email = e.target.elements.email.value
    try {
      let data = await redefinePassword(email)
      this.setState({data, loading: false})
    } catch (e) {
      const errors = isArray(e)
        ? e
        : [e.data ? flattenDeep(Object.values(e.data.errors)) : e]
      this.setState({errors, loading: false})
    }
  }

  render() {
    const {errors, loading, data} = this.state
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          {data.name ? (
            <Fragment>
              <p>
                Enviamos um e-mail pra você com instruções para criar uma nova
                senha.
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <h1>Lembrar Senha</h1>
              <p>
                Digite abaixo o e-mail cadastrado e vamos te ajudar a criar uma
                senha nova.
              </p>
              <input type="email" placeholder="Email" name="email" />

              <EmCasaButton disabled={loading} full type="submit">
                {loading ? 'Aguarde...' : 'Enviar'}
              </EmCasaButton>
              <Errors errors={errors} />
              <p>
                <Link href="/auth/login" as="/login">
                  <a>Voltar para login</a>
                </Link>
              </p>
            </Fragment>
          )}
        </Form>
      </Fragment>
    )
  }
}
