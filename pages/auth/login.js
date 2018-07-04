import {Component, Fragment} from 'react'
import Link from 'next/link'
import Form from 'components/shared/Common/Form'
import Errors from 'components/shared/Common/Errors'
import EmCasaButton from 'components/shared/Common/Buttons'
import {getCookie, removeCookie} from 'lib/session'
import {signIn, redirectIfAuthenticated} from 'lib/auth'
import _ from 'lodash'
import Head from 'next/head'
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
        success,
        renderFooter: false
      }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({errors: [], loading: true})
    const {url} = this.props

    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    try {
      const user = await signIn(email, password, url)
    } catch (e) {
      const errors = _.isArray(e)
        ? e
        : [e.data ? _.flattenDeep(Object.values(e.data.errors)) : e]
      this.setState({errors, loading: false})
    }
  }

  render() {
    const {errors, loading} = this.state
    const {url} = this.props

    return (
      <Fragment>
        <Head>
          <title>Login | EmCasa</title>
          <meta name="description" content="Login | EmCasa" />
          <meta property="og:description" content="Login | EmCasa" />

          <meta name="twitter:title" content="Login | EmCasa" />
          <meta name="twitter:description" content="Faça seu login" />
        </Head>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
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
            <Link
              href={{
                pathname: '/auth/signup',
                query: url.query && url.query.r ? {r: url.query.r} : {}
              }}
              as={{
                pathname: '/signup'
              }}
            >
              <a>Cadastre-se</a>
            </Link>
          </p>
        </Form>
      </Fragment>
    )
  }
}
