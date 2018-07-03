import App, {Container} from 'next/app'
import _ from 'lodash'
import Layout from 'components/shared/Shell'
import {isAuthenticated, isAdmin, getCurrentUserId} from 'lib/auth'
import withApolloClient from 'lib/apollo/withApolloClient'
import {ApolloProvider} from 'react-apollo'
import {getJwt} from 'lib/auth'
class MyApp extends App {
  static async getInitialProps(ctx) {
    let pageProps = {}

    const {Component, router, ctx: context} = ctx

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context)
    }

    const authenticated = isAuthenticated(context)

    return {
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

  render() {
    const {
      Component,
      pageProps,
      url,
      router,
      authenticated,
      isAdmin,
      apolloClient,
      currentUser
    } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Layout
            authenticated={authenticated}
            isAdmin={isAdmin}
            renderFooter={_.isUndefined(pageProps.renderFooter) ? true : false}
            pageProps={pageProps}
            router={router}
          >
            <Component
              {...pageProps}
              url={url}
              router={router}
              user={currentUser}
              client={apolloClient}
            />
          </Layout>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
