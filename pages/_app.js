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
import {getCookie, removeCookie} from 'lib/session'
import Router from 'next/router'
import Link from 'next/link'
import Error from 'components/shared/Shell/Error'
import codes from 'constants/statusCodes'
import makeStore from 'redux/store'
import {ThemeProvider} from 'styled-components'
import theme from 'config/theme'
import '@emcasa/ui-dom/components/global-styles'

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
    Sentry.withScope((scope) => {
      if (errorInfo) {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key])
        })
      }
      Sentry.captureException(error)
    })
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
      <ThemeProvider theme={theme}>
        <Container>
          <ApolloProvider client={apolloClient}>
            <Provider store={store}>
              <Layout
                authenticated={authenticated}
                isAdmin={isAdmin}
                renderFooter={
                  isUndefined(pageProps.renderFooter) ? true : false
                }
                pageProps={pageProps}
                router={router}
              >
                {error ? (
                  <Fragment>
                    <Head>
                      <title>EmCasa</title>
                    </Head>
                    <Error>
                      <h1>{codes[error.code] || 'Erro não identificado'}</h1>
                      <h2>{error.code}</h2>
                      <p>
                        Visite nossa <Link href="/">página inicial</Link> ou
                        entre em&nbsp;
                        <Link href="mailto:contato@emcasa.com">
                          contato
                        </Link>{' '}
                        com a gente
                      </p>
                    </Error>
                  </Fragment>
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
      </ThemeProvider>
    )
  }
}

export default withApolloClient(withRedux(makeStore)(MyApp))
