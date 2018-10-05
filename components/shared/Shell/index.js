import {Component, Fragment} from 'react'
import {withRouter} from 'next/router'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import Header from './Header'
import Footer from './Footer'
import Container, {Main} from './styles'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => NProgress.done()

class Layout extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      authenticated,
      isAdmin,
      errorCode,
      renderFooter,
      pageProps,
      router
    } = this.props
    return (
      <Fragment>
        <Head />
        <Header
          errorCode={errorCode}
          authenticated={authenticated}
          isAdmin={isAdmin}
          notifications={this.notifications}
          router={router}
          hideSeparator={pageProps.hideSeparator}
          shortLogo={pageProps.shortLogo}
        />
        <Container>
          <Main>{this.props.children}</Main>
          {renderFooter && <Footer />}
        </Container>
      </Fragment>
    )
  }
}

export default withRouter(Layout)
