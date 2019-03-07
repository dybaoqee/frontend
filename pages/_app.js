import {Fragment} from 'react'
import {Provider} from 'react-redux'
import * as Sentry from '@sentry/browser'
import withRedux from 'next-redux-wrapper'
import App, {Container} from 'next/app'
import Head from 'next/head'
import isUndefined from 'lodash/isUndefined'
import Layout from 'components/shared/Shell'
import {isAuthenticated, isAdmin, getCurrentUserId} from 'lib/auth'
import withApolloClient from 'lib/apollo/withApolloClient'
import {ApolloProvider} from 'react-apollo'
import {getJwt} from 'lib/auth'
import {getCookie, removeCookie, setCookie} from 'lib/session'
import Router from 'next/router'
import Link from 'next/link'
import codes from 'constants/statusCodes'
import makeStore from 'redux/store'
import { DEVICE_ID_COOKIE } from 'components/shared/Flagr'
import uuid from 'utils/uuid'
import HTTPMessage from 'components/shared/Shell/HTTPMessage'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

class MyApp extends App {
  static async getInitialProps(ctx) {
    const SENTRY_DSN = process.env.SENTRY_DSN
    const {Component, router, ctx: context} = ctx
    global.res = context.res
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context)
    }

    const authenticated = isAuthenticated(context)

    return {
      SENTRY_DSN,
      pageProps,
      url: {
        query: router.query,
        pathname: router.pathname,
        asPath: router.asPath
      },
      authenticated,
      currentUser: {
        id: getCurrentUserId(context),
        authenticated,
        admin: isAdmin(context),
        jwt: getJwt(context)
      },
      isAdmin: isAdmin(context)
    }
  }

  componentDidMount() {
    Sentry.init({dsn: this.props.SENTRY_DSN})
    if (getCookie('resetAuth')) {
      removeCookie('jwt')
      removeCookie('currentUserId')
      removeCookie('userRole')
      removeCookie('resetAuth')
      Router.push('/auth/login')
    }

    // Set deviceId for Flagr
    const deviceId = uuid()
    if (!getCookie(DEVICE_ID_COOKIE) && deviceId) {
      setCookie(DEVICE_ID_COOKIE, deviceId)
    }

    if (!document.documentElement.classList.contains('wf-active')) {
      import('webfontloader').then((WebFont) =>
        WebFont.load({
          google: {
            families: ['Open+Sans:300,400,600,700']
          }
        })
      )
    }
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      if (errorInfo) {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key])
        })
      }
      Sentry.captureException(error)
    });
  }

  render() {
    const {
      Component,
      pageProps,
      url,
      router,
      authenticated,
      isAdmin,
      apolloClient,
      currentUser,
      error,
      store
    } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <Layout
              authenticated={authenticated}
              isAdmin={isAdmin}
              renderFooter={isUndefined(pageProps.renderFooter) ? true : false}
              pageProps={pageProps}
              router={router}
            >
              {error ? (
                <ThemeProvider theme={theme}>
                  <HTTPMessage asPath={url.asPath} statusCode={error.code} />
                </ThemeProvider>
              ) : (
                <Component
                  {...pageProps}
                  url={url}
                  router={router}
                  user={currentUser}
                  client={apolloClient}
                />
              )}
            </Layout>
          </Provider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(
  withRedux(makeStore)(MyApp)
)
