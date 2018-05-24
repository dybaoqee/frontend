import App, {Container} from 'next/app'
import _ from 'lodash'
import Layout from 'components/shared/Shell'
import {isAuthenticated, isAdmin, getCurrentUserId} from 'lib/auth'
import withApolloClient from 'lib/apollo/withApolloClient'
import {ApolloProvider} from 'react-apollo'
class MyApp extends App {
  static async getInitialProps({Component, router, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      pageProps,
      url: {
        query: router.query,
        pathname: router.pathname,
        asPath: router.asPath
      },
      authenticated: isAuthenticated(ctx),
      currentUser: {
        id: getCurrentUserId(ctx),
        authenticated: isAuthenticated(ctx),
        admin: isAdmin(ctx)
      },
      isAdmin: isAdmin(ctx)
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
            />
          </Layout>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
