import App, {Container} from 'next/app'
import _ from 'lodash'
import Layout from 'components/shared/Shell'
import {isAuthenticated, isAdmin} from 'lib/auth'
import withData from 'lib/apollo/withData'
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
    const {Component, pageProps, url, authenticated, isAdmin} = this.props
    return (
      <Container>
        <Layout
          authenticated={authenticated}
          isAdmin={isAdmin}
          renderFooter={_.isUndefined(pageProps.renderFooter) ? true : false}
        >
          <Component {...pageProps} url={url} />
        </Layout>
      </Container>
    )
  }
}

export default withData(MyApp)
