import {Component} from 'react'
import {getCookie, removeCookie} from 'lib/session'
import {redirectIfAuthenticated} from 'lib/auth'
import Head from 'next/head'
import AccountKit from 'components/shared/Auth/AccountKit'
import Container from 'components/shared/Common/Container'

export default class Login extends Component {
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

  render() {
    return (
      <Container>
        <Head>
          <title>Login | EmCasa</title>
          <meta name="description" content="Login | EmCasa" />
          <meta property="og:description" content="Login | EmCasa" />

          <meta name="twitter:title" content="Login | EmCasa" />
          <meta name="twitter:description" content="Faça seu login" />
        </Head>

        <AccountKit
          appId={process.env.FACEBOOK_APP_ID}
          appSecret={process.env.ACCOUNT_KIT_APP_SECRET}
          version="v1.0"
          autoLogin={true}
        >
          {() => null}
        </AccountKit>
      </Container>
    )
  }
}
