import App, {Container} from 'next/app'
import _ from 'lodash'
import Layout from 'components/shared/Shell'
import {isAuthenticated, isAdmin} from 'lib/auth'
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
      isAdmin: isAdmin(ctx)
    }
  }

  render() {
    const {
      Component,
      pageProps,
      url,
      authenticated,
      isAdmin,
      apolloClient
    } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Layout
            authenticated={authenticated}
            isAdmin={isAdmin}
            renderFooter={_.isUndefined(pageProps.renderFooter) ? true : false}
            pageProps={pageProps}
          >
            <Component {...pageProps} url={url} />
          </Layout>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
