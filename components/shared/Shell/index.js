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
  render() {
    const {authenticated, isAdmin, errorCode, renderFooter} = this.props

    return (
      <Fragment>
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/styles/nprogress.css"
          />
        </Head>
        <Header
          errorCode={errorCode}
          authenticated={authenticated}
          isAdmin={isAdmin}
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
