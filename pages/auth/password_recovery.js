import {Component, Fragment} from 'react'

import Layout from 'components/shared/Shell'
import Form from 'components/shared/Common/Form'
import Errors from 'components/shared/Common/Errors'
import EmCasaButton from 'components/shared/Common/Buttons'
import {getCookie, removeCookie} from 'lib/session'
import {redefinePassword, redirectIfAuthenticated} from 'lib/auth'
import _ from 'lodash'

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
        success
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
      const errors = _.isArray(e)
        ? e
        : [e.data ? _.flattenDeep(Object.values(e.data.errors)) : e]
      this.setState({errors, loading: false})
    }
  }

  render() {
    const {errors, loading, data} = this.state
    return (
      <Layout>
        <Form onSubmit={this.handleSubmit}>
          {data.name ? (
            <Fragment>
              <p>{`${_.capitalize(
                data.name.split(' ')[0]
              )}, enviamos um e-mail pra você com instruções para criar uma nova senha.`}</p>
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
            </Fragment>
          )}
        </Form>
      </Layout>
    )
  }
}
