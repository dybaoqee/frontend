import {Component} from 'react'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'
import HTTPMessage from 'components/shared/Shell/HTTPMessage'

export default class ErrorPage extends Component {
  static getInitialProps({err, res}) {
    if (err && err.response) {
      res.statusCode = err.response.status
    }

    return {
      err,
      statusCode: res ? res.statusCode : 404
    }
  }

  render() {
    const {statusCode, url:{asPath}} = this.props
    return (
      <ThemeProvider theme={theme}>
        <HTTPMessage asPath={asPath} statusCode={statusCode} />
      </ThemeProvider>
    )
  }
}
