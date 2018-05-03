import {Component, Fragment} from 'react'
import {withRouter} from 'next/router'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import Header from './Header'
import Footer from './Footer'
import Container, {Main} from './styles'

import {AuthConsumer, AuthProvider} from 'components/providers/Auth'

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
      <AuthProvider>
        <AuthConsumer>
          {({user}) => {
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
                  user={user}
                />
                <Container>
                  <Main>{this.props.children}</Main>
                  {renderFooter && <Footer />}
                </Container>
              </Fragment>
            )
          }}
        </AuthConsumer>
      </AuthProvider>
    )
  }
}

export default withRouter(Layout)
